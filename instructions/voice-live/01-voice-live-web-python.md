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
* Add code to complete the web app
* Review comments in the overall code base
* Update and run the deployment script
* View and test the application

This exercise takes approximately **30-40** minutes to complete.

## Launch the Azure Cloud Shell and download the files

In this section of the exercise you download the a zipped file containing the base files for the app.

1. In your browser navigate to the Azure portal [https://portal.azure.com](https://portal.azure.com); signing in with your Azure credentials if prompted.

1. Use the **[\>_]** button to the right of the search bar at the top of the page to create a new cloud shell in the Azure portal, selecting a ***Bash*** environment. The cloud shell provides a command line interface in a pane at the bottom of the Azure portal.

    > **Note**: If you have previously created a cloud shell that uses a *PowerShell* environment, switch it to ***Bash***.

1. In the cloud shell toolbar, in the **Settings** menu, select **Go to Classic version** (this is required to use the code editor).

1. Run the following command in the **Bash** shell to download and unzip the exercise files. The second command will also change to the directory for the exercise files.

    ```bash
    wget https://github.com/JeffKoMS/az-dev-copy/raw/voice-live/allfiles/downloads/python/voice-live-web.zip
    ```

    ```
    unzip voice-live-web.zip && cd 01-voice-live-web
    ```

## Add code to complete the web app

Now that the exercise files are downloaded, the the next step is to add code to complete the application. The following steps are performed in the cloud shell. 

>**Tip:** Resize the cloud shell to display more information, and code, by dragging the top border. You can also use the minimize and maximize buttons to switch between the cloud shell and the main portal interface.

Run the following command to change into the *src* directory before you continue with the exercise.

```bash
cd src
```

### Add code to implement the voice live assistant

In this section you add code to implement the voice live assistant. This code defines the connection and imports the SDK components needed to establish the connection and configure the session.

1. Run the following command to open the *flask_app.py* file for editing.

    ```bash
    code flask_app.py
    ```

1. Search for the **# BEGIN VOICELIVE ASSISTANT IMPLEMENTATION** comment in the code. Copy the code below and enter it just below the comment. Be sure to check the indentation.

    ```python
    def __init__(
        self,
        endpoint: str,
        credential,
        model: str,
        voice: str,
        instructions: str,
        state_callback=None,
    ):
        # Store Azure VoiceLive connection and configuration parameters
        self.endpoint = endpoint
        self.credential = credential
        self.model = model
        self.voice = voice
        self.instructions = instructions
        
        # Initialize runtime state - connection established in start()
        self.connection = None
        self._response_cancelled = False  # Used to handle user interruptions
        self._stopping = False  # Signals graceful shutdown
        self.state_callback = state_callback or (lambda *_: None)
    
    async def start(self):
        # Import VoiceLive SDK components needed for establishing connection and configuring session
        from azure.ai.voicelive.aio import connect  # type: ignore
        from azure.ai.voicelive.models import (
            RequestSession,
            ServerVad,
            AzureStandardVoice,
            Modality,
            InputAudioFormat,
            OutputAudioFormat,
        )  # type: ignore
    ```

