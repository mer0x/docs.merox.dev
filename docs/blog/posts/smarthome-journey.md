---
draft: false 
date: 2024-09-30
categories:
  - Smarthome
  - Server
  - Configuration
authors:
  - robertmelcher
description: Discover how I transformed my home into a smart, automated space using Alexa, Home Assistant, and other devices. Learn about routines, integration challenges, and tips for building your own efficient smart home setup.
comments: true
slug: smarthome-journey
---


# Automating My Smart Home Journey


<figure markdown="span">
  ![header-media](/images/smarthomejourney.webp){ width="700" }
  <figcaption>IoT</figcaption>
</figure>


## Introduction

What started as a simple wish to control lights using my phone quickly turned into a fully integrated smart home setup. I’ve always been a bit lazy when it comes to getting up to switch things off manually, but once I discovered the potential of smart devices like Amazon Alexa and Home Assistant, I was hooked. Over time, I’ve expanded the system to include a wide range of devices that automate my entire home.

<!-- more -->


## Devices I Use


In my smart home setup, I’ve integrated several key devices:

- **Amazon Alexa**: I use Alexa in every room (living room, bedroom, kitchen) to control most devices via voice commands.
- **Home Assistant**: Running on a Dell server through a VM, Home Assistant is the central brain of my setup, managing more complex automations and scripts.
- **Broadlink RM4 Pro**: This acts as a bridge for RF and IR devices, allowing me to control roller blinds and non-smart appliances.
- **Philips Hue & Goove Lights**: These add mood lighting, often synchronized with specific routines like _"movie time"_.
- **Roborock Vacuum**, **Resideo Thermostat**, and **air conditioning units**.
- **Smart Roller Blinds**: Controlled through Broadlink using RF signals.

In the near future, I plan to add **cameras** and a **Yale smart lock**.
!!! info "Hue TV&Lights"
      <figure markdown="span">
        ![header-media](/images/livin.JPG){ width="600" }
      </figure>

## Alexa and Home Assistant

Initially, Alexa controlled most of the devices, but once I introduced Home Assistant, things got even more flexible. I now have full automation based on my location, weather conditions, and custom scripts. For example, when I <b>leave the house</b>, motion sensors activate, and all roller blinds close automatically. When I return, the system opens the blinds, adjusts the temperature based on the outside weather, and even turns on night lights to guide me through the dark.


## Example Automations

### Morning and Night Routines

One of the key routines I rely on is **Good Morning** and **Good Night**, which create a seamless transition from sleep to waking and vice versa. These routines handle:

- Opening the blinds to a certain level in the morning to let in natural light.
- Shutting down all lights and closing the blinds in the evening to create the perfect environment for sleep.

This automation has made mornings feel more natural and relaxing, and night routines are much more consistent without having to remember to switch everything off.

### Movie and Gaming Time

When it’s time for a movie or gaming session, I have created automations to handle the ambiance and setup:

- **Movie Time**: The blinds in the living room close, the TV turns on and switches to Netflix, the soundbar is set to a specific sound mode, and the air conditioning turns on if it’s summer. Additionally, the ambient lighting around the TV adjusts to create the perfect movie-watching environment.
- **Gaming Time**: Similar to Movie Time, but the TV connects to the PlayStation 5, and the lights adjust for a more immersive experience.


!!! info "Alexa & Philips Hue screenshots"
      <div style="display: flex; justify-content: space-between;">
      <img src="/images/alexa1.PNG" alt="Alexa Screenshot 1" style="width: 30%; height: auto;"/>
      <img src="/images/alexa2.PNG" alt="Alexa Screenshot 2" style="width: 30%; height: auto;"/>
      <img src="/images/hue.PNG" alt="Alexa Screenshot 3" style="width: 30%; height: auto;"/>
      </div>


<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/CYd3HTyMJSM?si=XGJjNgpgZBM0M066" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>



### Security Setup
For security, my motion sensors automatically trigger when I leave, and I receive notifications via Alexa and Home Assistant if anything unusual happens. For instance, any significant changes in room temperature or other unexpected events will prompt alerts, helping me stay in control even when I’m away.


## Tutorial: Integrating Broadlink with Alexa & RF Learning

Here’s a simple tutorial on how I used **Broadlink RM4 Pro** to integrate RF devices like my roller blinds with Alexa.

### Step 1: Set Up Broadlink RM4 Pro

1. Download the **Broadlink app** and follow the steps to connect the RM4 Pro to your Wi-Fi.
2. Register an account and add the RM4 Pro device in the app.

### Step 2: Learn RF Signals

1. Select **Add Remote** in the Broadlink app, and choose _"RF Appliance"_.
2. Use your original remote for the roller blinds, press the corresponding button while the app is in **Learning Mode**, and save the learned code.
3. Test the new button to make sure it controls the blinds.

### Step 3: Connect Broadlink to Alexa

1. In the **Alexa app**, enable the Broadlink skill.
2. Link your Broadlink account and let Alexa discover your RF devices.

Now, you can use voice commands like, _“Alexa, close the blinds,”_ and it will work seamlessly.

!!! info "Broadlink screenshots"
      <div style="display: flex; justify-content: space-between;">
      <img src="/images/broadlink1.PNG" alt="Broadlink1" style="width: 30%; height: auto;"/>
      <img src="/images/broadlink2.PNG" alt="Broadlink2" style="width: 30%; height: auto;"/>
      <img src="/images/broadlink3.PNG" alt="Broadlink3" style="width: 30%; height: auto;"/>
      </div>


## Challenges and Advanced Automations

### The Most Challenging Part: Running Linux Scripts

One of the more challenging aspects was getting **Home Assistant** to correctly execute **Linux scripts** based on my GPS location. Using **bash commands**, I created scripts that adjust server fan speeds based on external temperatures when I leave or return home.

For example:
- When I’m away, the server fan speeds up to keep the system cool.
- Lights automatically adjust, and blinds close.
- When I come back, the system reverses these actions.

==/root/homeassistant/configuration.yaml==
```bash linenums="1"
#!/bin/bash
# Adjust server fan speed based on external temperature
shell_command:
  set_fans_home: 'ssh -i /config/ssh/id_rsa -o StrictHostKeyChecking=no root@10.10.10.10 /usr/bin/ipmitool -I lanplus -H 10.10.10.200 -U root -P SuperSecretPassword raw 0x30 0x30 0x02 0xff 0x14'
  set_fans_away: 'ssh -i /config/ssh/id_rsa -o StrictHostKeyChecking=no root@10.10.10.10 /usr/bin/ipmitool -I lanplus -H 10.10.10.200 -U root -P SuperSecretPassword raw 0x30 0x30 0x02 0xff 0x28'
```

<figure markdown="span">
  ![header-media](/images/HAuto.png){ width="800" }
  <figcaption>HA Automation</figcaption>
</figure>

### Future Plans
In the near future, I plan to integrate more advanced routines based on my location and possibly automate the Yale smart lock to engage whenever I leave home. The ability to do this with a combination of Alexa and Home Assistant makes the whole process incredibly smooth.

### More automations
- Below, you can see more simple automations videos from my smart home


    === "Balcony light"
    
         <center> <iframe width="560" height="315" src="https://www.youtube.com/embed/l6i4DPdkLjc?si=dlezgkF_pDZsnxTx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>

    === "Alexa start cleaning"


        <center><iframe width="560" height="315" src="https://www.youtube.com/embed/FoG73PS4eQU?si=KcRq9LK7e7zuAW8h" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>


    === "Kitchen sensor"

        <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
          <center><iframe width="560" height="315" src="https://www.youtube.com/embed/igOCmdXgi-c?si=LxcSTg1tMbDKJuYb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>
        </div>


### Conclusion
Building a smart home is an ongoing project, and with tools like Broadlink, Alexa, and Home Assistant, it’s more accessible than ever. Whether you’re just starting or already have a setup, there’s always room for improvement and more efficient automation. The beauty of smart home devices lies in how they can adapt to your personal routines and preferences, making everyday life a little easier.

### Nice to check


<div class="grid cards" markdown>

- <a href="https://www.youtube.com/watch?v=BJJMKsowQSg&t=531s">:simple-youtube: __Smart Home Solver__  YouTube Channel</a>
- <a href="https://www.youtube.com/watch?v=4FXLqsceBxo&t=676s">:simple-youtube: __Grayson Adams__  YouTube Channel</a>
- <a href="https://www.youtube.com/watch?v=vD_xckjQxRk">:simple-youtube: __Smart Home Junkie__  YouTube Channel</a>
- <a href="https://www.youtube.com/watch?v=Oxg6rzZo-Pg">:simple-youtube: __Everything Smart Home__  YouTube Channel</a>

</div>