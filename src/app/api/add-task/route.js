import connectToDB from "@/app/database";
import Task from "@/app/model";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewTask = Joi.object({
  title: Joi.string().required(),
  detail: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectToDB();
    const extractTaskData=await req.json();
    const { title, detail } = extractTaskData;
    
    const { error } = AddNewTask.validate({
      title,
      detail,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.detail[0].message,
      });
    }
    const newlyCreatedTaskItem = await Task.create(extractTaskData);
    if (newlyCreatedTaskItem) {
      return NextResponse.json({
        success: true,
        message: "Task add successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "something went wrong! try again one",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong! try again two",
    });
  }
}
