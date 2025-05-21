"use client";
import Sidebar from "@/components/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { permit } from "@/helpers/constants/image.constant";
import { ROUTES } from "@/helpers/constants/routes.constant";
import { MonitorDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";
import React from "react";
import { RootState } from "@/redux-store";
import { useSelector } from "react-redux";

export default function PermitConfirmation() {
  const ref: any = React.createRef();
  const navigate = useNavigate();
  const issuePermit = useSelector(
    (state: RootState) => state.permitStore.issuePermitData
  );
  console.log("Issue Permit Data:", issuePermit); 

  return (
    <main className="relative isolate">
      <Sidebar>
        <div className="mx-auto mt-8">
          <Card className="mt-0.4 border rounded-md shadow">
            <CardContent className="mt-6">
              <div className="mt-4">
                <p className="font-[#292C2A] text-lg">Learner's Permit</p>
              </div>

              <div></div>

              <div>
                <div className="flex gap-4 mt-8">
                  <div className="">
                    <div className="">
                      <div className="grid grid-cols-2 gap-6">
                        {/* ID Card Section */}
                        <div>
                          <PDFExport paperSize="A4" margin="0.5cm" ref={ref}>
                            <img src={permit} />
                          </PDFExport>
                        </div>

                        {/* Details Section */}
                        <div>
                          <div className="text-sm space-y-12">
                            <div className="mb-4">
                              <p className="font-medium text-xs text-gray-500">
                                Full Name
                              </p>
                              <p className="font-semibold">
                                {issuePermit?.firstName}{issuePermit?.lastName}
                              </p>
                            </div>
                            <div className="mb-4">
                              <p className="font-medium text-xs text-gray-500">
                                Student ID
                              </p>
                              <p className="font-semibold">{issuePermit?.studentNo}</p>
                            </div>
                            <div className="mb-4">
                              <p className="font-medium text-xs text-gray-500">
                                Issue Date
                              </p>
                              <p className="font-semibold">
                                {issuePermit?.createdAt}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => {
                            if (ref.current) {
                              ref.current.save();
                            }
                          }}
                          className="bg-[#28A745] text-white px-6 py-2 rounded-md text-sm flex items-center space-x-2"
                        >
                          <MonitorDown className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center mt-6">
                        <p className="text-xs text-gray-500">
                          <span className="font-medium text-[#107BC0]">
                            Note:
                          </span>{" "}
                          Learner’s Permit has been sent to the student’s email
                          address.
                        </p>
                        <button
                          className="bg-[#107BC0] text-white text-sm px-10 py-2 rounded-sm flex items-center"
                          onClick={() => navigate(ROUTES.STUDENTS)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </main>
  );
}
