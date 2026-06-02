import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type BookingEmailData = {
  to: string;
  name?: string | null;
  rentalId: number;
  carName: string;
  pickupDate: Date;
  returnDate: Date;
  pickupLocation: string;
  totalPrice: number;
  baseTotalPrice?: number;
  discountAmount?: number;
  discountPercent?: number;
};

export async function sendBookingConfirmationEmail({
  to,
  name,
  rentalId,
  carName,
  pickupDate,
  returnDate,
  pickupLocation,
  totalPrice,
  baseTotalPrice,
  discountAmount,
  discountPercent,
}: BookingEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY missing. Email not sent.");
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Rydex <bookings@rydex.space>",
    to,
    subject: `Rydex Booking Confirmed #${rentalId}`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #31363F; padding: 32px; color: #EEEEEE;">
        <div style="max-width: 600px; margin: 0 auto; background: #222831; border-radius: 22px; padding: 28px;">
          <h1 style="color: #76ABAE; margin-bottom: 8px;">Booking Confirmed</h1>

          <p style="font-size: 16px;">Hi ${name || "there"},</p>

          <p style="color: #d6d6d6;">
            Your Rydex rental has been confirmed successfully.
          </p>

          <div style="background: rgba(255,255,255,0.06); padding: 18px; border-radius: 16px; margin-top: 24px;">
            <p><strong>Rental ID:</strong> #${rentalId}</p>
            <p><strong>Car:</strong> ${carName}</p>
            <p><strong>Pickup date:</strong> ${pickupDate.toLocaleDateString()}</p>
            <p><strong>Return date:</strong> ${returnDate.toLocaleDateString()}</p>
            <p><strong>Pickup location:</strong> ${pickupLocation}</p>
            
            <hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;" />

            <p><strong>Base price:</strong> €${baseTotalPrice ?? totalPrice}</p>
            <p><strong>Rank discount:</strong> ${
              discountPercent && discountPercent > 0
                ? `${discountPercent}% (-€${discountAmount})`
                : "No discount"
            }</p>
            <p><strong>Final price:</strong> €${totalPrice}</p>
          </div>

          <p style="margin-top: 24px; color: #d6d6d6;">
            Thank you for choosing Rydex.
          </p>

          <p style="font-size: 12px; color: #888;">
            This is an automated confirmation email.
          </p>
          <p style="font-size: 12px; color: #888;">
            If you have any questions, please <a href="http://localhost:3000/contact" style="color: #76ABAE; text-decoration: underline;">contact us</a>.
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendCancellationEmail({
  to,
  name,
  rentalId,
  carName,
  pickupDate,
  returnDate,
  pickupLocation,
}: Omit<BookingEmailData, "totalPrice">) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY missing. Email not sent.");
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Rydex <bookings@rydex.space>",
    to,
    subject: `Rydex Booking Cancelled #${rentalId}`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #31363F; padding: 32px; color: #EEEEEE;">
        <div style="max-width: 600px; margin: 0 auto; background: #222831; border-radius: 22px; padding: 28px;">
          <h1 style="color: #76ABAE; margin-bottom: 8px;">Booking Cancelled</h1>

          <p style="font-size: 16px;">Hi ${name || "there"},</p>

          <p style="color: #d6d6d6;">
            Your Rydex rental has been cancelled.
          </p>

          <div style="background: rgba(255,255,255,0.06); padding: 18px; border-radius: 16px; margin-top: 24px;">
            <p><strong>Rental ID:</strong> #${rentalId}</p>
            <p><strong>Car:</strong> ${carName}</p>
            <p><strong>Pickup date:</strong> ${pickupDate.toLocaleDateString()}</p>
            <p><strong>Return date:</strong> ${returnDate.toLocaleDateString()}</p>
            <p><strong>Pickup location:</strong> ${pickupLocation}</p>
          </div>

          <p style="margin-top: 24px; color: #d6d6d6;">
            Your payment will be refunded according to our cancellation policy. Please allow a few business days for the refund to process. Thank you for choosing Rydex, and we hope to serve you again in the future.
          </p>

          <p style="font-size: 12px; color: #888;">
            This is an automated cancellation email.
          </p>
          <p style="font-size: 12px; color: #888;">
            If you have any questions, please <a href="http://localhost:3000/contact" style="color: #76ABAE; text-decoration: underline;">contact us</a>.
          </p>
        </div>
      </div>
    `,
  });
}
