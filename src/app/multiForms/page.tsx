"use client"
import { useForm,  useFieldArray } from 'react-hook-form';
import { RiDeleteBin6Line } from "react-icons/ri"
import { useModal } from '../context/ModalContext';
import { useEffect } from 'react';

type FormValues = {
name: {ItemName: string;}[];
}

export default function Home() {
  const { openModal, closeModal, currentModal } = useModal();
  const {
    register,
    control,
    handleSubmit,
    getValues ,
    setError,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: [{ ItemName: "",}]
    },
    mode: "onChange"
  });
  const {
    fields, append, remove,
  } = useFieldArray({control,
    name: "name"
  });
  



  const onSubmit = (data:FormValues) =>{
    closeModal();
    console.log(data);
  };

  useEffect(() => {
    openModal("Form1")
  }, []);

  const openFormTwo = () => {
    closeModal();
    openModal("Form2");
    handleSubmit(onSubmit);
  }

  const openFormOne = () => {
    closeModal();
    openModal("Form1");
  }

  return (
    <main className='w-full h-screen flex justify-center items-center'>
      <div className='relative bg-white w-[90%] md:w-[70%] h-[80%] mx-auto md:px-5 rounded-2xl shadow-2xl flex items-center gap-5'>
        <div className='hidden md:flex w-[40%] h-full bg-gray-300'>
          <h3 className='m-4 text-2xl'><span className='font-bold'>Multi</span>-Forms</h3>
        </div>
        <div className='relative w-full my-8 md:w-[60%] h-full md:my-2 shadow-2xl'>
          { (currentModal === "Form1") &&
          (
            <div className='relative w-full h-full'>
              <form  onSubmit={openFormTwo} className='relative h-full flex flex-col px-5 md:px-10 pb-14 space-y-4 overflow-y-scroll'>
                <label className='text-xl font-bold mt-5'>Items</label>
                  {
                    fields.map((item, index) => (
                      <div key={item.id}>
                        <div className='flex items-center gap-4'>
                          <input
                          required
                          className='border border-gray-400 rounded-md py-2 px-3 outline-none'
                          placeholder='New Item'
                          {...register(`name.${index}.ItemName`, { required: true })}
                          />
                          {
                          (fields.length > 1 && <RiDeleteBin6Line
                          onClick={() => remove(index)}
                          className="cursor-pointer"/>)}
                        </div>
                      </div>
                    ))
                  }
                  <div>
                  <button
                  className=' bg-stone-200 rounded py-1 px-3 text-gray-800 cursor-pointer'
                  onClick={() => { append({ ItemName: "",});}}> Add + </button>
                  </div>
              
                  <button type='submit' className='absolute bottom-2 right-5 md:right-10 font-bold cursor-pointer'>
                  NEXT <sup className='relative top-[-2px]'>→</sup>
                  </button>
              </form>
            </div>
          )}


          { (currentModal === "Form2") &&
          (<div className='relative w-full h-full'>
              <form className='relative h-full flex flex-col px-5 md:px-10 pb-14 space-y-4 overflow-y-scroll'>
            <label className='text-xl text-center font-bold mt-5'>All Items</label>
            <div className='w-full h-px bg-gray-400'></div>
            {getValues().name.map((value, index) => (
              <li key={index} className='flex flex-col gap-3 list-disc'>
              {value.ItemName}
              </li>
            ))}
            <div onClick={openFormOne} className='absolute bottom-2 left-5 md:right-10 font-bold cursor-pointer'>
              PREV <sup className='relative top-[-2px]'>&larr;</sup>
            </div>
            </form>
          </div>)}
        </div>
      </div>
    </main>
  )
}
