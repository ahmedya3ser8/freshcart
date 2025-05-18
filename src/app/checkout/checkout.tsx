"use client"
import Input from "@components/forms/Input";
import useOrders from "@hooks/useOrders";
import { LuLoader } from "react-icons/lu";

const Checkout = ({ cartId }: {cartId: string}) => {
  const {setPayment, payment, isPendingCashOrder, isPendingOnlineOrder, register, handleSubmit, errors, submitForm} = useOrders(cartId)
  return (
    <section className="py-6">
      <form onSubmit={handleSubmit(submitForm)} className="max-w-lg mx-auto">
        <Input label="Details:" register={register} name="details" error={errors.details?.message as string} />
        <Input label="Phone:" type="tel" register={register} name="phone" error={errors.phone?.message as string} />
        <Input label="City:" register={register} name="city" error={errors.city?.message as string} />
        <div className="mb-3">
          <label htmlFor="payment" className="block mb-1 text-green-500 font-medium">Choose Payment</label>
          <select name="payment" value={payment} onChange={(e) => setPayment(e.target.value)} id="payment" className="w-full p-2 border border-green-500 outline-none rounded-md">
            <option value="online">Online Payment</option>
            <option value="cash">Cash On Delivery</option>
          </select>
        </div>
        <button className="p-2 bg-green-500 text-white rounded-md">
          {(payment === 'cash' ? isPendingCashOrder : isPendingOnlineOrder) ? <LuLoader className="animate-spin" /> : 'Checkout'}
        </button>
      </form>
    </section>
  )
}

export default Checkout;
