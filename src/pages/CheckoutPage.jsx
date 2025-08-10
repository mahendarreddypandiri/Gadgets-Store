import { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useCart } from '../state/CartContext'
import { setPageSEO } from '../utils/seo'

const schema = Yup.object({
  fullName: Yup.string().min(2).required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().min(7).required('Required'),
  address: Yup.string().min(4).required('Required'),
  city: Yup.string().required('Required'),
  zip: Yup.string().required('Required'),
  payment: Yup.string().oneOf(['card', 'cod']).required('Required'),
})

export default function CheckoutPage() {
  const { state, totals, clearCart } = useCart()
  useEffect(() => setPageSEO({ title: 'Checkout – Gadgets Store', description: 'Enter shipping details and complete your order.' }), [])

  if (state.items.length === 0) {
    return (
      <div className="container-responsive py-12 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </div>
    )
  }

  return (
    <div className="container-responsive py-8">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-3">
        <section className="md:col-span-2 card p-6">
          <Formik
            initialValues={{ fullName: '', email: '', phone: '', address: '', city: '', zip: '', payment: 'card' }}
            validationSchema={schema}
            onSubmit={(values, { resetForm, setStatus }) => {
              setTimeout(() => {
                setStatus('Order placed! Confirmation sent to ' + values.email)
                clearCart()
                resetForm()
              }, 600)
            }}
          >
            {({ isSubmitting, status }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="fullName">Full Name</label>
                  <Field className="input" id="fullName" name="fullName" />
                  <ErrorMessage name="fullName" component="div" className="text-sm text-red-600" />
                </div>
                <div>
                  <label className="label" htmlFor="email">Email</label>
                  <Field className="input" id="email" name="email" type="email" />
                  <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                </div>
                <div>
                  <label className="label" htmlFor="phone">Phone</label>
                  <Field className="input" id="phone" name="phone" />
                  <ErrorMessage name="phone" component="div" className="text-sm text-red-600" />
                </div>
                <div className="md:col-span-2">
                  <label className="label" htmlFor="address">Address</label>
                  <Field className="input" id="address" name="address" />
                  <ErrorMessage name="address" component="div" className="text-sm text-red-600" />
                </div>
                <div>
                  <label className="label" htmlFor="city">City</label>
                  <Field className="input" id="city" name="city" />
                  <ErrorMessage name="city" component="div" className="text-sm text-red-600" />
                </div>
                <div>
                  <label className="label" htmlFor="zip">ZIP</label>
                  <Field className="input" id="zip" name="zip" />
                  <ErrorMessage name="zip" component="div" className="text-sm text-red-600" />
                </div>
                <div className="md:col-span-2">
                  <div className="label">Payment Method</div>
                  <label className="mr-4"><Field type="radio" name="payment" value="card" className="mr-1" />Card</label>
                  <label><Field type="radio" name="payment" value="cod" className="mr-1" />Cash on Delivery</label>
                  <ErrorMessage name="payment" component="div" className="text-sm text-red-600" />
                </div>
                <div className="md:col-span-2 flex items-center gap-3">
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>Place Order</button>
                  {status && <span className="text-green-600">{status}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </section>
        <aside className="card p-6 h-fit">
          <h2 className="font-semibold mb-3">Order Summary</h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {state.items.map(item => (
              <li key={item.id} className="py-2 flex items-center justify-between">
                <span className="text-sm">{item.name} × {item.quantity}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between py-2 border-t mt-2">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${totals.total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
