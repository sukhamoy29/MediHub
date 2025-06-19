### Plan:

1. **Update `AppointmentsData.jsx`**:

   - Remove the `room` property from each appointment object.
   - Add a new property called `paymentStatus` to each appointment object, which will indicate the payment status (e.g., "Online", "Pending").

2. **Update `AppointmentSection.jsx`**:

   - Remove the column for `Room` in the appointments table.
   - Add a new column for `Payment Status` to display the payment information for each appointment.
   - Ensure that the new payment status is displayed correctly in the table.

3. **Review Other Files**:
   - Check if any other files (like `AppointmentDetailsModal.jsx` or `AppointmentNavbar.jsx`) need updates to reflect the changes in the appointment data structure or to accommodate the new payment options.

### Follow-up Steps:

- Verify the changes in the files.
- Test the application to ensure that the new payment options are displayed correctly and that the application functions as expected.
