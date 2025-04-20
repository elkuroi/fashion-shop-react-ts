export async function createCheckoutSession(data: any) {
    const res = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  
    if (!res.ok) throw new Error('Stripe session error')
    return res.json()
  }