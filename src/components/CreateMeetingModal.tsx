import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import * as y from "yup";
import {BsFillCalendarPlusFill} from 'react-icons/bs'
import { IMeeting } from "../types";
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'



type Props = {
    meetings: IMeeting[],
    setMeetings: React.Dispatch<React.SetStateAction<IMeeting[]>>
}

const initialValues = {
    id: '',
    title: "",
    timeEst: "",
    description: "",
    meetingUrl: "",
    topic: ''
  };

  const validationSchema = y.object({
    title: y.string().min(1).max(55).required(),
    timeEst: y.string().min(1).max(25).required('estimated time is a required field'),
    description: y.string().min(1).max(155).required(),
    meetingUrl: y.string().min(1).url('video/chat conference url is invalid').optional(),
    topic: y.string().min(1).max(55).optional()
   });
  
  


const CreateMeetingModal = ({meetings, setMeetings}: Props) => {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [disabled, setDisabled] = useState(false);

    const onSubmit =  (values: IMeeting, action: any ) => {
   
        try {
             setDisabled(true);
            const id =  uuidv4().slice(0,8)
            values.id = id
             localStorage.setItem("meetings", JSON.stringify([...meetings, values]));
             setMeetings([...meetings, values])
        
         toast.success('Meeting added successfully!')
        action.resetForm()
        setOpen(false)
            setDisabled(false)
        } catch (error: any) {
         toast.error(error.message + ": Unable to add meeting")
        }
         }
 
    
         return (
            <>
            <button onClick={() => setOpen(true)} className={("addBtn font-medium transition ease-in-out delay-140 hover:-translate-y-1 hover:scale-110  duration-300 px-2 mt-4 w-32 py-2 bg-secondary rounded-full")}>
            Add Meeting
            </button>
            <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
        
                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="my-40 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-secondary sm:mx-0 sm:h-10 sm:w-10">
                       <BsFillCalendarPlusFill className="text-white" size={20} />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Add Meeting
                          </Dialog.Title>
                          <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    >
                        {(formProps ) => (
                          <Form className="mt-2">
                          <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
                            <h1 className="ml-2 text-sm">Title<span className='text-red-600'> *</span></h1>
                        <ErrorMessage name="title">
                         { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
                        </ErrorMessage>
                    <Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
                       type="text"
                       id="inputTitle"
                       name="title"
                        disabled={disabled}
                        placeholder="e.g. Meeting with VP & Manager" />
                        </div>

                        <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
                        <h1 className="ml-2 text-sm">Estimated Time<span className='text-red-600'> *</span></h1>
                        <ErrorMessage name="timeEst">
                         { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
                        </ErrorMessage>
                    <Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
                         type="text"
                         id="inputTimeEst"
                         name="timeEst"
                         placeholder="e.g. 30 minutes"
                        disabled={disabled} />
                        </div>
        
                        <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
                        <h1 className="ml-2 text-sm">Description<span className='text-red-600'> *</span></h1>
                        <ErrorMessage name="description">
                         { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
                        </ErrorMessage>
                    <Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        id="inputDescription"
                        name="description"
                        placeholder="e.g. Quarterly performance review"  
                        disabled={disabled} />
                        </div>

                        <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
                        <h1 className="ml-2 text-sm">Topic(s)</h1>
                        <ErrorMessage name="topic">
                         { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
                        </ErrorMessage>
                    <Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        id="inputTopic"
                        name="topic"
                        placeholder="e.g. Evaluation, Performance, ect..."  
                        disabled={disabled} />
                        </div>

                          

                        <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
                        <h1 className="ml-2 text-sm">Video/chat conference link</h1>
                        <ErrorMessage name="meetingUrl">
                         { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
                        </ErrorMessage>
                    <Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        type="text"
                        id="inputMeetingUrl"
                        name="meetingUrl"
                        placeholder="e.g. Zoom, Google Meet URL, ect" 
                        disabled={disabled} />
                        </div>


                      
        
                        <button
                        disabled={disabled || !formProps.isValid}
                        type="submit"
                        className="w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:border-none inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  font-medium hover:bg-green-500 hover:text-white bg-white  border-green-500 text-sm text-green-500 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {formProps.isSubmitting ? 'Adding meeting...' : 'Add'}
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                          </Form>
                          )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          </>
         )
}

export default CreateMeetingModal