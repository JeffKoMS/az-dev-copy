---
lab:
    topic: Azure Voice Live
    title: 'Create a web app for real-time voice interaction with an AI model'
    description: 'Learn how to create a Flask-based web app to enable real-time voice interactions with an AI model.'
---

# Create a web app for real-time voice interaction with an AI model

In this exercise, you complete a Python web app based on Flask. You add the code to initialize the session, and handle key session events. You use a deployment script that: deploys the AI model; creates an image of the app in Azure Container Registry (ACR) using ACR tasks; and then creates an Azure App Service instance that pulls the the image. 

Tasks performed in this exercise:

* Download the base files for the app
* Update sections of the code to complete the app
* Update and run the deployment script
* View and test the application

This exercise takes approximately **30-40** minutes to complete.

## Launch the Azure Cloud Shell and download the files

In this section of the exercise you download the a zipped file containing the base files for the app.

1. In your browser navigate to the Azure portal [https://portal.azure.com](https://portal.azure.com); signing in with your Azure credentials if prompted.

1. Use the **[\>_]** button to the right of the search bar at the top of the page to create a new cloud shell in the Azure portal, selecting a ***Bash*** environment. The cloud shell provides a command line interface in a pane at the bottom of the Azure portal.

    > **Note**: If you have previously created a cloud shell that uses a *PowerShell* environment, switch it to ***Bash***.

1. In the cloud shell toolbar, in the **Settings** menu, select **Go to Classic version** (this is required to use the code editor).

1. Run the following command in the Bash shell to download and unzip the exercise files.

    ```bash
    wget https://github.com/JeffKoMS/az-dev-copy/raw/voice-live/allfiles/downloads/python/voice-live-web.zip
    ```

    ```
    unzip voice-live-web.zip
    ```
