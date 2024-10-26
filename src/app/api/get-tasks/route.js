import connectToDB from "@/app/database";
import Task from "@/app/model";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const extractTaskDataForm = await Task.find({});
    if (extractTaskDataForm) {
      return NextResponse.json({
        // success: true,
        data: extractTaskDataForm,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went Wrong! please try again one",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went Wrong! please try again two",
    });
  }
}
