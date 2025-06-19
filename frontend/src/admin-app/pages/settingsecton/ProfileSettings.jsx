import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../user-app/context/AuthContext";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const ProfileSettings = () => {
  const { user } = useContext(AuthContext);

  console.log("Current user from AuthContext:", user);

  const [profile, setProfile] = useState({
    clinicName: "",
    email: "",
    phoneNumber: "",
    specialty: "",
    address: "",
    fees: "",
    bio: "",
    services: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.access_token) {
      setError("Please login to access your profile");
      setTimeout(() => {
        window.location.href = "/AuthPage";
      }, 2000);
      return;
    }

    const userId = user.id;
    console.log("ProfileSettings useEffect userId:", userId);
    // Allow any non-zero numeric ID (excluding negative IDs)
    if (typeof userId === "number" && userId > 0) {
      fetchProfile(userId);
    } else {
      console.warn("Invalid userId, skipping fetchProfile:", userId);
      setProfile({
        clinicName: "",
        email: "",
        phoneNumber: "",
        specialty: "",
        address: "",
        fees: "",
        bio: "",
        services: "",
      });
    }
  }, [user]);

  const fetchProfile = (userId) => {
    api
      .get(`/clinic-profile/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setProfile({
          clinicName: data.clinic_name || "",
          email: data.email || "",
          phoneNumber: data.phone_number || "",
          specialty: data.specialty || "",
          address: data.address || "",
          fees: data.fees ? data.fees.toString() : "",
          bio: data.bio || "",
          services: data.services || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        if (error.response?.status === 401) {
          setError("Session expired. Please log in again.");
          setTimeout(() => {
            window.location.href = "/AuthPage";
          }, 2000);
        } else if (error.response?.status === 404) {
          setProfile({
            clinicName: "",
            email: "",
            phoneNumber: "",
            specialty: "",
            address: "",
            fees: "",
            bio: "",
            services: "",
          });
        } else {
          setError("Failed to fetch profile data. Please try again later.");
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const requiredFields = [
      "clinicName",
      "email",
      "phoneNumber",
      "specialty",
      "address",
      "fees",
    ];
    for (const field of requiredFields) {
      if (!profile[field]) {
        setError("All fields marked with * are required.");
        return false;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!/^[1-9][0-9]{9,14}$/.test(profile.phoneNumber)) {
      setError("Please enter a valid phone number.");
      return false;
    }
    if (isNaN(parseFloat(profile.fees)) || parseFloat(profile.fees) < 0) {
      setError("Please enter a valid fees amount.");
      return false;
    }
    return true;
  };

  const handleSaveChanges = () => {
    if (!user || !user.access_token) {
      setError("Session expired. Please log in again.");
      setTimeout(() => {
        window.location.href = "/AuthPage";
      }, 2000);
      return;
    }

    const userId = user.id;
    // Allow any non-zero numeric ID (including negative IDs for demo users)
    if (typeof userId !== "number" || userId === 0) {
      setError("Saving profile is disabled for demo users.");
      return;
    }

    if (!validateFields()) {
      return;
    }

    const payload = {
      clinic_name: profile.clinicName,
      email: profile.email,
      phone_number: profile.phoneNumber,
      specialty: profile.specialty,
      address: profile.address,
      fees: parseFloat(profile.fees),
      bio: profile.bio,
      services: profile.services,
      user_id: userId,
    };

    // First try to update existing profile
    api
      .put(`/clinic-profile/user/${userId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        if (error.response?.status === 401) {
          setError("Session expired. Please log in again.");
          setTimeout(() => {
            window.location.href = "/AuthPage";
          }, 2000);
          return;
        }
        // If profile doesn't exist (404), create a new one
        if (error.response?.status === 404) {
          api
            .post(`/clinic-profile`, payload, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.access_token}`,
              },
            })
            .then(() => {
              toast.success("Profile created successfully!");
            })
            .catch((createError) => {
              console.error("Error creating profile:", createError);
              let errorMessage = "Failed to create profile. Please try again.";
              if (createError.response?.data?.detail) {
                if (Array.isArray(createError.response.data.detail)) {
                  errorMessage = createError.response.data.detail
                    .map((err) => `${err.loc.join(".")}: ${err.msg}`)
                    .join("; ");
                } else {
                  errorMessage = createError.response.data.detail;
                }
              }
              setError(errorMessage);
              toast.error(errorMessage);
            });
        } else {
          const errorMessage =
            error.response?.data?.detail ||
            "Failed to update profile. Please try again.";
          setError(errorMessage);
          toast.error(errorMessage);
        }
      });
  };

  return (
    <div className="max-w-7xl mx-4 sm:mx-auto bg-white p-6 rounded-lg shadow-md">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2 className="text-2xl font-semibold">Profile Information</h2>
      <p className="text-gray-500">
        Update your personal information and profile details
      </p>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium">
            Clinic Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="City Health Clinic"
            name="clinicName"
            value={profile.clinicName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Email Address<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="sarah.johnson@medihub.com"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="+1 (555) 123-4567"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Specialty<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Multi-Specialty"
            name="specialty"
            value={profile.specialty}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Clinic Address<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="123 Main St, Downtown"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Fees (₹)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="150"
            name="fees"
            value={profile.fees}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mt-1 h-24"
          placeholder="Experienced healthcare administrator with over 10 years in medical practice management."
        />
        <p className="text-gray-500 text-xs mt-1">
          Brief description for your profile. URLs are hyperlinked.
        </p>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Clinic Services</label>
        <textarea
          name="services"
          value={profile.services}
          onChange={handleChange}
          placeholder="e.g., General Medicine, X-Ray, Blood Test, Physiotherapy"
          className="w-full border rounded-lg p-2 mt-1 h-24"
        />
      </div>

      <button
        onClick={handleSaveChanges}
        disabled={typeof user?.id !== "number" || user?.id === 0}
        className={`mt-6 px-4 py-2 rounded text-white ${
          typeof user?.id === "number"
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Save Profile
      </button>
    </div>
  );
};

export default ProfileSettings;
