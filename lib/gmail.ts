import nodemailer from 'nodemailer'
import { getBaseUrl } from './constants'

interface BookingEmailData {
  name: string
  email: string
  service: string
  date?: string
  time?: string
  barber: string
  queueNumber?: string
  bookingId?: string
  location?: string
}

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendBookingConfirmationEmail(data: BookingEmailData): Promise<boolean> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('[Gmail] Gmail credentials not configured, skipping email')
    return false
  }

  try {
    const { name, email, service, date, time, barber, queueNumber, location } = data
    
    // Get base URL for images
    const baseUrl = getBaseUrl()
    
    const prettyDate = date || 'To be scheduled'
    const prettyTime = time || 'To be confirmed'
    const datetime = date && time ? `${date} ${time}` : 'To be scheduled'

    const html = `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]--><!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css2?family=Droid+Serif:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        sup,
        sub {
            font-size: 75%;
            line-height: 0;
        }

        @media (max-width:700px) {

            .desktop_hide table.icons-inner,
            .row-4 .column-1 .block-2.social_block .alignment table,
            .social_block.desktop_hide .social-table {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }

            .row-3 .column-1 .block-1.heading_block td.pad {
                padding: 0 !important;
            }

            .row-3 .column-1 .block-1.heading_block h2 {
                font-size: 34px !important;
            }

            .row-3 .column-1 .block-2.paragraph_block td.pad>div,
            .row-3 .column-1 .block-3.paragraph_block td.pad>div,
            .row-3 .column-1 .block-5.paragraph_block td.pad>div {
                font-size: 16px !important;
            }

            .row-3 .column-1 .block-2.paragraph_block td.pad {
                padding: 10px 0 !important;
            }

            .row-2 .column-1 .block-1.heading_block td.pad {
                padding: 0 20px !important;
            }

            .row-2 .column-1 .block-1.heading_block h1 {
                font-size: 42px !important;
            }

            .row-3 .column-1 .block-3.paragraph_block td.pad,
            .row-3 .column-1 .block-5.paragraph_block td.pad {
                padding: 20px 0 !important;
            }

            .row-4 .column-1 .block-2.social_block td.pad {
                padding: 10px !important;
            }

            .row-4 .column-1 .block-2.social_block .alignment {
                text-align: center !important;
            }

            .row-3 .row-content {
                padding: 40px 20px !important;
            }
        }
    </style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="background-color: #050404; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #050404;">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; color: #000000; padding-bottom: 20px; padding-top: 20px; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                                                    <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="center">
                                                                    <div style="max-width: 200px;"><img src="${baseUrl}/logo/Pro_barbershop_logo.png" style="display: block; height: auto; border: 0; width: 100%;" width="200" alt="Pro Barber Shop ZA" title="Pro Barber Shop ZA" height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; color: #000000; border-radius: 0; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 40px; vertical-align: top;">
                                                    <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;text-align:center;width:100%;">
                                                                <h1 style="margin: 0; color: #fbf8f8; direction: ltr; font-family: 'Droid Serif', Georgia, Times, 'Times New Roman', serif; font-size: 58px; font-weight: 400; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 70px;"><span class="tinyMce-placeholder" style="word-break: break-word;">BOOKING CONFIRMED</span></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="center">
                                                                    <div style="max-width: 680px;"><img src="${baseUrl}/Images/working-tools-barber-master(1).jpg" style="display: block; height: auto; border: 0; width: 100%;" width="680" alt="Pro Barber Shop Interior" title="Pro Barber Shop Interior" height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; color: #000000; border-radius: 0; padding: 60px; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                                                    <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <h2 style="margin: 0; color: #fffefe; direction: ltr; font-family: 'Droid Serif', Georgia, Times, 'Times New Roman', serif; font-size: 48px; font-weight: 400; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 58px;"><span class="tinyMce-placeholder" style="word-break: break-word;"><strong>HI ${name.toUpperCase()}</strong>,</span></h2>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
                                                                <div style="color:#ffffff;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:20px;font-weight:300;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:24px;">
                                                                    <p style=\"margin: 0;\">Your appointment has been successfully booked at Slaqa.<br><br>Please arrive on time for your scheduled appointment.</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <table class="image_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="center">
                                                                    <div style="max-width: 408px;"><img src="${baseUrl}/Images/pexels-rdne-7697476.jpg" style="display: block; height: auto; border: 0; width: 100%;" width="408" alt="Barbershop Interior" title="Barbershop Interior" height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad" style="padding-bottom:40px;padding-left:45px;padding-right:45px;padding-top:20px;">
                                                                <div style="color:#ffffff;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:18px;font-weight:300;letter-spacing:0px;line-height:1.4;text-align:center;mso-line-height-alt:25px;">
                                                                    <p style="margin: 0 0 12px 0;"><strong>Service:</strong> ${service}</p>
                                                                    <p style="margin: 0 0 12px 0;"><strong>Date:</strong> ${prettyDate}</p>
                                                                    <p style="margin: 0 0 12px 0;"><strong>Time:</strong> ${prettyTime}</p>
                                                                    <p style="margin: 0 0 12px 0;"><strong>Barber:</strong> ${barber}</p>
                                                                    <p style="margin: 0;"><strong>Location:</strong> 35 Nyakata St, Lamontville</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad" style="padding-bottom:20px;padding-left:45px;padding-right:45px;padding-top:20px;">
                                                                <div style="color:#bea287;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.4;text-align:center;mso-line-height-alt:22px;">
                                                                    <p style="margin: 0 0 12px 0;"><strong>What happens next?</strong></p>
                                                                    <p style="margin: 0 0 8px 0;">• Your booking has been saved to our system</p>
                                                                    <p style="margin: 0 0 8px 0;">• Arrive 5-10 minutes before your appointment</p>
                                                                    <p style="margin: 0 0 8px 0;">• Arrive 5-10 minutes before your appointment time</p>
                                                                    <p style="margin: 0 0 8px 0;">• We'll contact you via WhatsApp if needed</p>
                                                                    <p style="margin: 0;">• We'll send you a reminder 24 hours before</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; color: #000000; border-radius: 0; padding-bottom: 25px; padding-top: 40px; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;">
                                                    <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="center">
                                                                    <div style="max-width: 180px;"><img src="${baseUrl}/logo/Pro_barbershop_logo.png" style="display: block; height: auto; border: 0; width: 100%;" width="180" alt="Pro Barber Shop ZA" title="Pro Barber Shop ZA" height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="social_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:10px;padding-top:10px;text-align:left;">
                                                                <div class="alignment" align="center">
                                                                    <table class="social-table" width="200px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                                                        <tr>
                                                                            <td style="padding:0 8px;"><a href="${baseUrl}" target="_blank" style="color: #bea287; text-decoration: none; font-size: 12px; font-weight: 600;">Website</a></td>
                                                                            <td style="padding:0 8px;"><a href="https://wa.me/27682188679" target="_blank" style="color: #bea287; text-decoration: none; font-size: 12px; font-weight: 600;">WhatsApp</a></td>
                                                                            <td style="padding:0 8px;"><a href="tel:+27682188679" target="_blank" style="color: #bea287; text-decoration: none; font-size: 12px; font-weight: 600;">Call Us</a></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;">
                                                    <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad" style="padding-bottom:20px;padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div style="color:#ffffff;direction:ltr;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:300;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
                                                                    <p style="margin: 0 0 8px 0;">© ${new Date().getFullYear()} Pro Barber Shop ZA</p>
                                                                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #bea287;">Slaqa - Umlazi</p>
                                                                    <p style="margin: 0; font-size: 14px; color: #bea287;">1 Swazi Rd, Umlazi A, Umlazi 4089</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><!-- End -->
</body>

</html>
`

    const mailOptions = {
      from: {
        name: 'Pro Barber Shop ZA',
        address: process.env.GMAIL_USER || 'bookings@probarbershop.co.za'
      },
      to: email,
      subject: `✓ Booking Confirmed - ${service}`,
      html: html,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('[Gmail] Confirmation email sent to:', email, 'Service:', service, 'Message ID:', result.messageId)
    return true

  } catch (error) {
    console.error('[Gmail] Failed to send confirmation email:', error)
    return false
  }
}

export async function sendServiceCompletionEmail(data: BookingEmailData): Promise<boolean> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('[Gmail] Gmail credentials not configured, skipping email')
    return false
  }

  try {
    const { name, email, service } = data

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - Pro Barber Shop</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #ffffff;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 15px;
        }
        .message {
            color: #555555;
            margin-bottom: 20px;
            font-size: 16px;
            line-height: 1.8;
        }
        .highlight {
            color: #d4a574;
            font-weight: bold;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #777777;
        }
        .footer-links {
            margin: 15px 0;
        }
        .footer-links a {
            color: #d4a574;
            text-decoration: none;
            margin: 0 10px;
        }
        .divider {
            border-top: 1px solid #e0e0e0;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">We appreciate your business</p>
        </div>

        <div class="content">
            <div class="greeting">Hi ${name},</div>

            <div class="message">
                We wanted to take a moment to thank you for visiting <span class="highlight">Pro Barber Shop ZA</span> and trusting us with your grooming needs.
            </div>

            <div class="message">
                Your recent service:
                <br><strong style="color: #1a1a1a;">${service}</strong>
                <br> was completed with our signature attention to detail and care. We hope you're completely satisfied with your haircut and the overall experience you received from our team.
            </div>

            <div class="message">
                At Pro Barber Shop, we don't just cut hair – we build relationships with our valued clients. Your satisfaction is our top priority, and we take great pride in delivering professional grooming services with exceptional customer care.
            </div>

            <div class="message">
                <strong style="color: #1a1a1a;">We'd love to see you again soon!</strong>
                <br> Whether you need a regular maintenance cut, a new style, or want to try something fresh, our team is always ready to deliver the premium barber experience you deserve.
            </div>

            <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #d4a574; margin: 20px 0;">
                <p style="margin: 0; color: #333333;">
                    <strong>Ready to book your next appointment?</strong>
                    <br> Visit us online at <a href="https://probarbershop.co.za" style="color: #d4a574; text-decoration: none;">probarbershop.co.za</a> or contact us directly.
                </p>
            </div>

            <div class="message">
                Thank you again for choosing Pro Barber Shop. We're honored to be your preferred barber and look forward to serving you with the same excellence every time.
            </div>

            <div style="margin-top: 30px;">
                <p style="margin: 0; color: #959595; font-size: 14px;">Warm regards,</p>
                <p style="margin: 5px 0; color: #1a1a1a; font-weight: bold; font-size: 16px;">Pro Barber Shop ZA Team</p>
            </div>
        </div>

        <div class="footer">
            <div style="margin-bottom: 20px;">
                <p style="margin: 0; font-weight: bold; color: #333333;">Pro Barber Shop ZA</p>
                <p style="margin: 5px 0;">35 Nyakata St, Lamontville</p>
                <p style="margin: 0; color: #999999;">Chatsworth, 4027, South Africa</p>
            </div>

            <div class="divider" style="margin: 15px 0;"></div>

            <div class="footer-links">
                <a href="https://instagram.com/pro_barber_shop.za">Instagram</a>
                <a href="https://wa.me/27682188679">WhatsApp</a>
            </div>

            <p style="margin: 15px 0 0 0; color: #aaaaaa; font-size: 12px;">
                © ${new Date().getFullYear()} Pro Barber Shop ZA. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`

    const mailOptions = {
      from: {
        name: 'Pro Barber Shop ZA',
        address: process.env.GMAIL_USER || 'bookings@probarbershop.co.za'
      },
      to: email,
      subject: `Thank You for Your Visit - Pro Barber Shop ZA`,
      html: html,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('[Gmail] Service completion thank you email sent to:', email, 'Service:', service, 'Message ID:', result.messageId)
    return true

  } catch (error) {
    console.error('[Gmail] Failed to send service completion email:', error)
    return false
  }
}

export async function sendPostServiceEmail(data: BookingEmailData): Promise<boolean> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('[Gmail] Gmail credentials not configured, skipping email')
    return false
  }

  try {
    const { name, email, service, barber } = data

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>See You Next Time - Pro Barber Shop</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #ffffff;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .subheader {
            color: #d4a574;
            font-size: 16px;
            margin-top: 10px;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 20px;
        }
        .message {
            color: #555555;
            margin-bottom: 18px;
            font-size: 16px;
            line-height: 1.8;
        }
        .highlight {
            color: #d4a574;
            font-weight: bold;
        }
        .next-cut-box {
            background: linear-gradient(135deg, #f5f5f5 0%, #f9f9f9 100%);
            border-left: 4px solid #d4a574;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        .next-cut-box p {
            margin: 0;
            color: #333333;
            font-size: 16px;
            line-height: 1.8;
        }
        .cta-button {
            display: inline-block;
            background-color: #1a1a1a;
            color: #ffffff;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
            font-size: 16px;
        }
        .cta-button:hover {
            background-color: #333333;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #777777;
        }
        .footer-brand {
            font-weight: bold;
            color: #1a1a1a;
            font-size: 16px;
            margin-bottom: 10px;
        }
        .footer-links a {
            color: #d4a574;
            text-decoration: none;
            margin: 0 10px;
        }
        .divider {
            border-top: 1px solid #e0e0e0;
            margin: 25px 0;
        }
        .signature {
            font-style: italic;
            color: #888888;
            font-size: 14px;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Looking Sharp!</h1>
            <div class="subheader">Thanks for choosing Pro Barber Shop</div>
        </div>

        <div class="content">
            <div class="greeting">Hey ${name},</div>

            <div class="message">
                Thanks for stopping by <span class="highlight">Pro Barber Shop ZA</span> today! We hope you're loving the fresh cut and feeling confident with your new look.
            </div>

            <div class="message">
                Our team truly appreciated working with you, and we're glad ${barber && barber !== 'Any Available' ? barber : 'our barber'} could deliver exactly what you were looking for.
            </div>

            <div class="next-cut-box">
                <p>
                    <strong>Here's the thing about great haircuts:</strong> They don't last forever! 😊 
                    <br><br>
                    Most haircuts look their best for 3-4 weeks. So mark your calendar and book your next appointment with us soon. We'd love to keep you looking sharp and fresh!
                </p>
            </div>

            <div class="message">
                Whether you need a maintenance trim, want to try a new style, or just want to come back to Slaqa – we're here for you.
            </div>

            <div style="text-align: center;">
                <a href="https://probarbershop.co.za/book" class="cta-button">Book Your Next Appointment</a>
            </div>

            <div class="message">
                Can't wait to see you again! Feel free to reach out if you have any questions or want to chat about your next style.
            </div>

            <div class="signature">
                Best regards,<br>
                <strong>The Pro Barber Shop ZA Team</strong>
            </div>
        </div>

        <div class="footer">
            <div class="footer-brand">Pro Barber Shop ZA</div>
            <p style="margin: 5px 0; color: #666666;">35 Nyakata St, Lamontville</p>
            <p style="margin: 0 color: #666666;">Chatsworth, 4027, South Africa</p>

            <div class="divider"></div>

            <div style="margin: 15px 0;">
                <a href="https://instagram.com/pro_barber_shop.za">Instagram</a>
                <a href="https://wa.me/27682188679">WhatsApp</a>
            </div>

            <p style="margin: 15px 0 0 0; color: #aaaaaa; font-size: 12px;">
                © ${new Date().getFullYear()} Pro Barber Shop ZA. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`

    const mailOptions = {
      from: {
        name: 'Pro Barber Shop ZA',
        address: process.env.GMAIL_USER || 'bookings@probarbershop.co.za'
      },
      to: email,
      subject: `Looking Sharp! See You Next Time 💈`,
      html: html,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('[Gmail] Post-service email sent to:', email, 'Service:', service, 'Message ID:', result.messageId)
    return true

  } catch (error) {
    console.error('[Gmail] Failed to send post-service email:', error)
    return false
  }
}