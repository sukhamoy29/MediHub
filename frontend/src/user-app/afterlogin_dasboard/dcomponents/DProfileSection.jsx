import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext"; // Assuming AuthContext provides user info

// Update the axios base URL to match the backend prefix
const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

const DProfileSection = () => {
  const { user } = useContext(AuthContext); // Get user info from context

  const [profile, setProfile] = useState({
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    name: "",
    image: "",
  });

  useEffect(() => {
    setProfile((prev) => ({
      phoneNumber: prev.phoneNumber || "",
      email: prev.email || "",
      dob: prev.dob || "",
      gender: prev.gender || "",
      bloodGroup: prev.bloodGroup || "",
      houseNo: prev.houseNo || "",
      street: prev.street || "",
      city: prev.city || "",
      state: prev.state || "",
      pincode: prev.pincode || "",
      country: prev.country || "India",
      name: prev.name || "",
      image: prev.image || "",
    }));
  }, []);

  const [error, setError] = useState(null);
  useEffect(() => {
    if (!user || !user.id) {
      setError("Please login to access your profile");
      setTimeout(() => {
        window.location.href = "/AuthPage";
      }, 2000);
      return;
    }

    api
      .get(`/profile/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setProfile({
          phoneNumber: data.phone_number || "",
          email: data.email || "",
          dob: data.dob || "",
          gender: data.gender || "",
          bloodGroup: data.blood_group || "",
          houseNo: data.house_no || "",
          street: data.street || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
          country: data.country || "India",
          name: data.name || "",
          image: data.image || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        if (error.response?.status === 401) {
          console.error("Unauthorized: Token may be expired or invalid.");
          setError("Session expired. Please log in again.");
          setTimeout(() => {
            window.location.href = "/AuthPage";
          }, 2000);
          return;
        }
        if (error.response?.status === 404) {
          // Profile not found, do not create automatically
          // Just show empty form for user to fill
          setProfile({
            phoneNumber: "",
            email: "",
            dob: "",
            gender: "",
            bloodGroup: "",
            houseNo: "",
            street: "",
            city: "",
            state: "",
            pincode: "",
            country: "India",
            name: "",
            image: "",
          });
        } else {
          setError("Failed to fetch profile data. Please try again later.");
        }
      });
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({ ...prevProfile, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    if (!user || !user.id || !user.access_token) {
      setError("Session expired. Please log in again.");
      setTimeout(() => {
        window.location.href = "/AuthPage";
      }, 2000);
      return;
    }

    const requiredFields = [
      "phoneNumber",
      "email",
      "dob",
      "gender",
      "bloodGroup",
      "houseNo",
      "street",
      "city",
      "state",
      "pincode",
      "name",
    ];

    if (requiredFields.some((field) => !profile[field])) {
      setError("All fields marked with * are required.");
      return;
    }

    // Additional email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[1-9][0-9]{9}$/.test(profile.phoneNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }

    // Format the date to YYYY-MM-DD
    const formattedDate = new Date(profile.dob).toISOString().split("T")[0];

    const payload = {
      phone_number: profile.phoneNumber,
      email: profile.email,
      dob: formattedDate,
      gender: profile.gender,
      blood_group: profile.bloodGroup,
      house_no: profile.houseNo,
      street: profile.street,
      city: profile.city,
      state: profile.state || "West Bengal",
      pincode: profile.pincode,
      country: "India",
      name: profile.name,
      image: profile.image || "",
    };

    api
      .put(`/profile/${user.id}`, payload, {
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
          console.error("Unauthorized: Token may be expired or invalid.");
          setError("Session expired. Please log in again.");
          setTimeout(() => {
            window.location.href = "/AuthPage";
          }, 2000);
          return;
        }
        if (error.response?.status === 404) {
          // If profile doesn't exist, create it
          api
            .post(`/profile/${user.id}`, payload, {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold">Profile</h2>
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 sm:mb-0">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          {profile.image ? (
            <img
              src={profile.image}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-500">Image</span>
          )}
        </div>
        <div className="text-center sm:text-left">
          <p className="text-gray-600">Pick a photo from your computer</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-blue-500 hover:underline"
          />
        </div>
        <div className="ml-4 sm:ml-10 pl-2 sm:pl-10">
          <label className="text-sm font-medium">Name*</label>
          <input
            type="text"
            value={profile.name}
            onChange={handleChange}
            name="name"
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Enter your name"
            required
          />
        </div>
      </div>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Phone no *
          </label>
          <input
            type="text"
            value={profile.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            placeholder="Enter your phone number..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email Address*</label>
          <input
            type="email"
            value={profile.email}
            onChange={handleChange}
            name="email"
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Date of Birth*</label>
          <input
            type="date"
            value={profile.dob}
            onChange={handleChange}
            name="dob"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Gender*</label>
          <select
            value={profile.gender}
            onChange={handleChange}
            name="gender"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          >
            <option value="">Select an option</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Blood Group*</label>
          <select
            value={profile.bloodGroup}
            onChange={handleChange}
            name="bloodGroup"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          >
            <option value="">Select an option</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-2">Address</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-4 mb-4">
        <div>
          <label className="text-sm font-medium">
            House No./Street Name/Area*
          </label>
          <input
            type="text"
            value={profile.houseNo}
            onChange={handleChange}
            name="houseNo"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">
            Colony / Street / Locality*
          </label>
          <input
            type="text"
            value={profile.street}
            onChange={handleChange}
            name="street"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">City*</label>
          <input
            type="text"
            value={profile.city}
            onChange={handleChange}
            name="city"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">State*</label>
          <input
            type="text"
            value={profile.state}
            onChange={handleChange}
            name="state"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Country*</label>
          <input
            type="text"
            value={profile.country}
            readOnly
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Pincode*</label>
          <input
            type="text"
            value={profile.pincode}
            onChange={handleChange}
            name="pincode"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
      </div>
      <button
        onClick={handleSaveChanges}
        className="bg-slate-800 text-white px-4 py-2 rounded mt-4 sm:mt-0"
      >
        Save
      </button>
    </div>
  );
};

export default DProfileSection;
