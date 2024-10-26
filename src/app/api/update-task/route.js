import connectToDB from "@/app/database";
import Task from "@/app/model";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditTask = Joi.object({
  title: Joi.string().required(),
  detail: Joi.string().required(),
  status: Joi.string().required(),
  priority: Joi.string().required(),
  dueDate: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentTaskId = searchParams.get("id");
    if (!getCurrentTaskId) {
      return NextResponse.json({
        success: false,
        message: "Id Required",
      });
    }

    const { title, detail, status, priority, dueDate } = await req.json();
    const { error } = await EditTask.validate({
      title,
      detail,
      status,
      priority,
      dueDate,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateTask = await Task.findOneAndUpdate(
      {
        _id: getCurrentTaskId,
      },
      { title, detail, status, priority, dueDate },
      { new: true }
    );

    if (updateTask) {
      return NextResponse.json({
        success: true,
        message: "Task Updated Successfully",
      });
    } else {
    }
  } catch (error) {
    return NextResponse.json({
      sucess: false,
      message: "something went wrong....",
    });

    console.log(error);
    return NextResponse.json({
      sucess: false,
      message: "something went wrong....",
    });
  }
}
