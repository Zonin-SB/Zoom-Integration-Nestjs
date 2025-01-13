# Zoom Integration Project Using NestJS

## Table of Contents

- [Introduction](#introduction)
- [Technology](#technology)
- [Features](#features)
- [Run Backend](#run-backend)
- [Run Client Side](#run-client-side)
- [Copyright](#copyright)

## Introduction

This is a **Zoom Integration** project built using **NestJS**. It allows you to create Zoom meetings, list recordings of a particular user, and fetch specific recordings. It leverages the Zoom API and requires several Zoom credentials to work, including the `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`, `ZOOM_ACCOUNT_ID`, `ZOOM_SDK_CLIENT_ID`, and `ZOOM_SDK_CLIENT_SECRET`.

The application is designed to manage Zoom meeting creation, fetching recordings, and listing those recordings.

> **Note:** Please read the "Run" sections before opening an issue.
> **Warning:** This project is still in development and may not be fully stable for production environments.

## Technology

The application is built with:

- NestJS
- TypeScript
- Zoom API

## Features

- Create Zoom Meetings via API
- List Recordings of a particular user
- Fetch specific recordings based on user input
- Integration with Zoom API for meeting and recording management

## Run Backend

To run this backend application, you'll need to set up your own environment variables. The required variables include:

- **ZOOM_CLIENT_ID**: Your Zoom client ID (string).
- **ZOOM_CLIENT_SECRET**: Your Zoom client secret (string).
- **ZOOM_ACCOUNT_ID**: Your Zoom account ID (string).
- **ZOOM_SDK_CLIENT_ID**: Your Zoom SDK client ID (string).
- **ZOOM_SDK_CLIENT_SECRET**: Your Zoom SDK client secret (string).
- **PORT**: The port number for your application (string).

After configuring the environment variables in your `.env` file at the root of the project, you can install the dependencies using:

```bash
pnpm install
