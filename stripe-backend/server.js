require('dotenv').config()
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const nodemailer = require('nodemailer')

const app = express()
app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

app.post('/create-checkout-session', async (req, res) => {
  const { customer, items } = req.body

  try {
    const orderId = `ORD-${Date.now()}`


    await transporter.sendMail({
      from: 'no-reply@fashionshop.com',
      to: customer.email,
      replyTo: 'no-reply@fashionshop.com',
      subject: `🧾 Order Confirmation – ${orderId}`,
      html: `
        <div style="font-family: sans-serif; padding: 10px;">
          <h2 style="color: #4CAF50;">🎉 Thank you for your order!</h2>
          <p><strong>Order Number:</strong> ${orderId}</p>
          <p><strong>Name:</strong> ${customer.name}</p>
          <p><strong>Email:</strong> ${customer.email}</p>
          <p><strong>Phone:</strong> ${customer.phone}</p>
          <p><strong>Shipping Address:</strong> ${customer.address}</p>

          <h3>🛍️ Order Details:</h3>
          <ul>
            ${items.map(i => `<li>${i.name} x${i.quantity} — ${i.price} NOK</li>`).join('')}
          </ul>

          <p style="margin-top: 20px;">We will contact you soon with delivery information.</p>
          <p style="font-size: 0.9em; color: #888;">This is an automated message. Please do not reply.</p>
        </div>
      `,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customer.email,
      metadata: { orderId },
      line_items: items.map(item => ({
        price_data: {
          currency: 'nok',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `http://localhost:3000/success?orderId=${orderId}`,
      cancel_url: 'http://localhost:3000/checkout',
    })

    res.json({ id: session.id })
  } catch (err) {
    console.error('🔥 Error creating order or sending email:', err.message)
    res.status(500).json({ error: 'Failed to create session' })
  }
})

app.listen(4242, () => console.log('✅ Stripe backend running on http://localhost:4242'))