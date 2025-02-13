import React from 'react'
import { useFetchResponses } from '@/api/ResponseApi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';



const EventSummary = () => {

    const { data: responses,isLoading,isError } = useFetchResponses();
if(isLoading) return <p>Loading...</p>
if(isError) return <p>Error fecthing Data </p>
// to filter

const events = responses.filter((response) => response.formType === "event")

// To  calculate
const satisfactionResponses = events.flatMap((event) => event.data.filter((field) => field.type === "radio" &&  field.label.includes("satisfied")).map((field)=>{
    switch (field.value) {
        case "Very satisfied" : return 5;
        case "Satisfied" : return 4;
        case "Nutral" : return 3;
        case "Dissatisfied" : return 2;
        case "Very dissatisfied" : return 1;
        default : return 0;
    }
}))

// To Calculate total Satisfaction
const totalSatisfaction = satisfactionResponses.length
const  avarageSatisfaction = totalSatisfaction > 0 ? satisfactionResponses.reduce((sum, rating)=> sum + rating, 0 ) / totalSatisfaction : 0

// To Calculate Service Rating

const serviceRatings = events.flatMap((event) => event.data.filter((field) => field.type === "rating").map((field) => Number(field.value)))

// To Calculate TotalServiceRating
const totalServiceRatings = serviceRatings.length
const avarageServiceRating = totalServiceRatings > 0 ? serviceRatings.reduce((sum, rating ) => sum + rating, 0) / totalServiceRatings : 0 

// To Calculate Overall Rating

const overallRating =  ( (avarageSatisfaction + avarageServiceRating) / 2 ).toFixed(1)

// Star Rating

const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const fractionStar = rating - fullStars > 0
    return(
        <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, index ) => (
                <div key={index} className='relative ' >
                    {index < fullStars ? (<span className='text-bulb-yellow'> <FaStar/> </span>) : index === fullStars && fractionStar ? (<span className='text-bulb-yellow'> <FaStarHalfAlt/> </span>) : (<span className='text-gray-300'></span>)}
                </div>
            ))}
        </div>
    )
}

  return (
    <div className="w-full h-full p-2 rounded-[8px] bg-bulb-white" >
        <div className=''>
            {/* Satisfaction */}
            <div className='flex justify-between items-center'>
                <h2 className='text-gray-700'>
                    Satisfaction
                </h2>
                {renderStars(avarageSatisfaction)}
            </div>
            {/* Service Rating */}
            <div className='flex justify-between items-center mt-2'>
                <h2 className='text-gray-700'>Service Rating</h2>
                {renderStars(avarageServiceRating)}

            </div>
            <hr className='my-2 border-gray-300'/>
            {/* overall Rating */}
            <div className='flex justify-between items-center font-semibold'>
                <h2 >overall Rating</h2>
                <span>{overallRating}/5</span>
            </div>
        </div>
    </div>
  )
}

export default EventSummary