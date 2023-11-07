"use client"
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

type IFormInput = {
  firstName: string,
  lastName: string
}

export default function Home() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <main className='w-full h-screen flex justify-center items-center'>
      <div className='relative bg-white w-[90%] md:w-[70%] h-[80%] mx-auto md:px-5 rounded-2xl shadow-2xl flex items-center gap-5'>
        <div className='hidden md:flex w-[40%] h-full bg-gray-300'>
          <h3 className='m-4 text-2xl'><span className='font-bold'>Test</span></h3>
        </div>
        <div className='w-full my-8 md:w-[60%] h-full max-md:py-10 max-md:px-2 md:p-10 md:my-2 shadow-2xl'>
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <label className='font-bold'>First Name</label>
            <input {...register("firstName")} className='border border-gray-400 rounded-md py-2 px-3 outline-none'/>
            <label className='font-bold'>Last Name</label>
            <input {...register("lastName")} className='border border-gray-400 rounded-md py-2 px-3 outline-none'/>
            <input type="submit" className='bg-gray-500 text-white py-2 rounded-md hover:opacity-95 cursor-pointer' />
          </form>
        </div>

        <Link href={`/multiForms`} className='absolute bottom-5 right-5 md:right-10'>
        MOVE TO MULTI-FORMS <sup className='relative top-[-2px]'>→</sup>
        </Link>
      </div>
    </main>
  )
}
