export const ReservationMessage = (
  userName: string,
  resId: number,
  userId: number,
  roomId: number,
  roomName: string,
  totalDays: number,
  price_per_day: number,
  endDay: Date,
  startDay: Date
) => {
  // Generate a unique reservation ID
  const endDate = new Date(endDay).toISOString().split("T")[0];
  const reservationId = `${roomId}-${userId}-${resId}-${endDate}`;

  const header = "Reservation Confirmation";

  const message = `
  <p style="font-size: 17px; line-height: 1.6; text-align: left; color: #4d4d4d;">
    Dear <strong style="color: #2b6cb0;">${userName}</strong>,<br><br>
    Your reservation has been created successfully. Your reservation ID is: <strong style="color: #2b6cb0;">${reservationId}</strong><br><br>
    <p style="font-size: 18px; font-weight: 600; color: #2d3748;">Reservation Details:</p>
    <ul style="font-size: 16px; list-style-type: none; padding: 0; color: #4d4d4d;">
      <li><strong style="color: #2d3748;">Room:</strong> ${roomName}</li>
      <li><strong style="color: #2d3748;">Check-in Date:</strong> ${startDay}</li>
      <li><strong style="color: #2d3748;">Check-out Date:</strong> ${endDate}</li>
      <li><strong style="color: #2d3748;">Total Price:</strong> ${+price_per_day * totalDays} USD</li>
    </ul>
    <p style="font-size: 16px; text-align: left; color: #4d4d4d;">
      Thank you for choosing our hotel. We look forward to welcoming you soon!
    </p>
  </p>
`;

  const footer = `
  Best regards,<br>
  <span style="color: #2b6cb0; font-weight: bold;">Hotel Management Team</span>
`;

  return [header, message, footer];
};
