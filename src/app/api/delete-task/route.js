import connectToDB from "@/app/database";
import Task from "@/app/model";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentTaskId = searchParams.get("id");
    if (!getCurrentTaskId) {
      return NextResponse.json({
        success: false,
        message: "Id required",
      });
    }

    const deleteurentTaskById = await Task.findByIdAndDelete(getCurrentTaskId);
    if (deleteurentTaskById) {
      return NextResponse.json({
        success: true,
        message: "Task Deleted Sucessfully",
      })
    }  return NextResponse.json({
        success: false,
        message: "something went wrong....one",
      });

  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      message: "something went wrong....two",
    });
  }
}
