import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { S3 } from "@/lib/s3-client";

const uploadRequestSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = uploadRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { filename, contentType } = validation.data;

    console.log(filename, contentType);

    const uniqueKey = `${uuidv4()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: uniqueKey,
      // ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 3600, // URL expires in 60 minutes
    });

    const response = { presignedUrl, key: uniqueKey };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
