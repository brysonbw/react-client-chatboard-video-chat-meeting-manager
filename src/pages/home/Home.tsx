import React, { useEffect, useState, Fragment, useRef  } from 'react'
import CreateMeetingModal from '../../components/CreateMeetingModal'
import { IMeeting } from '../../types'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Dialog, Transition } from '@headlessui/react'
import * as y from "yup";
import {BsFillCalendarPlusFill} from 'react-icons/bs'
import toast from 'react-hot-toast'
import ScrollToTop from '../../components/ScrollToTop';
import {CopyToClipboard} from 'react-copy-to-clipboard';

type Props = {}

const validationSchema = y.object({
  title: y.string().min(1).max(55).required(),
  timeEst: y.string().min(1).max(25).required('estimated time is a required field'),
  description: y.string().min(1).max(155).required(),
  meetingUrl: y.string().min(1).url('video/chat conference url is invalid').optional(),
  topic: y.string().min(1).max(55).optional()
 });

const Home = (props: Props) => {
    const [meetings, setMeetings] = useState<IMeeting[]>([])
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [disabled, setDisabled] = useState(false);

    // get meetings
    const getMeetings = JSON.parse(localStorage.getItem("meetings" )!);
    useEffect(() => {
        if (getMeetings == null) {
            setMeetings([])
        } else {
            setMeetings(getMeetings);
        }
    }, [])


     // delete a meeting
     const deleteMeeting = (e: React.MouseEvent<HTMLButtonElement>): void => {
        try {
            const itemId = e.currentTarget.id
        const updateMeetingList = meetings.filter((i) => i.id !== itemId);
        setMeetings(updateMeetingList)
        localStorage.setItem("meetings", JSON.stringify(updateMeetingList));
        toast.success('Meeting deleted successfully!')
        } catch (error: any) {
            toast.error(error.message + ": Unable to delete meeting")
        }
        
    }

   

    // update meeting
    const onSubmit =  (values: IMeeting, action: any ) => {
      try {
           setDisabled(true);
           const index = meetings.findIndex(d => d.id === values.id);
           meetings[index] = Object.assign({}, meetings[index], values)
           localStorage.setItem('meetings', JSON.stringify(meetings));
       toast.success('Meeting updated successfully!')
      action.resetForm()
      setOpen(false)
          setDisabled(false)
      } catch (error: any) {
       toast.error(error.message + ": Unable to update meeting")
      }
       }

       
  return (
    <div className='co'>
      {/** Scroll to top */}
      <ScrollToTop />
        {/** Hero */}
       <h1 className='text-4xl text-center'>Chatboard Meeting Manager</h1>
       <h1 className=' mt-2 italic text-center'>Manage your video/chat conferences</h1>
       {/** Create Meeting Modal */}
       <CreateMeetingModal  meetings={meetings} setMeetings={setMeetings} />
       {/** Meetings/Card/List */}
       <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6'>
    {meetings?.map((item) => (
   <div key={item.id} className="w-full m-5 mx-auto overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
     <div className="p-5">
       <p className="text-medium mb-5 font-semibold text-xl text-gray-700">{item.title}</p>
       <p className="text-medium mb-5 text-gray-700">{item.description}</p>
       <p className="text-medium mb-5 text-gray-700">{item.timeEst}</p>
       <h1 className='mb-2 font-medium text-gray-700'>{item?.topic ? "Meeting topic(s)" : null}</h1>
       {item?.topic ? 
       <div className='flex justify-center mb-5'>
       {item?.topic.split("," || " ").map((i, index) => (
        <div key={index}>
         <span className=" bg-gray-100  text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{i}</span>
        </div>
        
       ))}
       </div> : null}

      {/** copy meeting link */}
      {item?.meetingUrl ? (
        <CopyToClipboard text={`${item?.meetingUrl}`}>
        <button
        
        onClick={e => {
          e.preventDefault();
          toast.success(
            `Meeting link successfully copied!`,
            {
              duration: 8000,
        })
          
        }}
        
        className="w-full mb-5  rounded-md bg-indigo-600  py-2 text-white hover:bg-indigo-500 hover:shadow-md duration-75">
         Meeting Link
        </button>
        </CopyToClipboard>
      
      ) : 
      (null)} 
    {/** Edit Button & edit meeting  */}
    <>
            <button onClick={() => setOpen(true)} className={("w-full rounded-md bg-gray-700 mb-5  py-2 text-white hover:bg-gray-800 hover:shadow-md duration-75")}>
            Edit 
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
                  <div className="my-40 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-secondary sm:mx-0 sm:h-10 sm:w-10">
                       <BsFillCalendarPlusFill className="text-white" size={20} />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Edit Meeting
                          </Dialog.Title>
                          <Formik
                    initialValues={{
                      id: item.id,
                      meetingUrl: item?.meetingUrl,
                      title: item.title,
                      timeEst: item.timeEst,
                      description: item.description,
                      topic: item?.topic
                    }}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    >
                       {/** edit form */}
                        {(formProps ) => (
                          <Form className="mt-2">
                             {/** edit title */}
                          <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
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

                             {/** edit timeEst(Estimated time) */}
                        <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
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
        
                           {/** edit description */}
                        <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
                        <ErrorMessage name="description">
                         { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
                        </ErrorMessage>
                    <Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        id="inputDescription"
                        name="description"
                        placeholder="e.g. Quarterly performance review"  
                        disabled={disabled} />
                        </div>

                          {/** edit topic */}
                          <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
                        <ErrorMessage name="topic">
                         { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
                        </ErrorMessage>
                    <Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        id="inputTopic"
                        name="topic"
                        placeholder="e.g. Evaluation, Performance, ect..."  
                        disabled={disabled} />
                        </div>

                          {/** edit meetingUrl */}
                        <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
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
                        {formProps.isSubmitting ? 'Updating meeting...' : 'Edit'}
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
      <button id={`${item.id}`} onClick={(e) => deleteMeeting(e)} className="w-full rounded-md bg-red-600 mb-5  py-2 text-white hover:bg-red-700 hover:shadow-md duration-75">Delete</button>
      
     </div>
   </div>
   ))}
   </div>
    </div>
  )
}

export default Home