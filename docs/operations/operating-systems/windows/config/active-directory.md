# Windows Server 2019 Active Directory Configuration Guide

This guide outlines the steps for setting up and managing Active Directory in Windows Server 2019, a crucial component for network resource management in an enterprise setting.

## Installation of Windows Server 2019

### Step 1: Install the Server Software
Begin by deploying Windows Server 2019 on your server hardware. Follow Microsoft's guided installation process to ensure a smooth setup.

## Promoting Server to Domain Controller

### Step 2: Activate Domain Controller Role
After the OS installation, proceed to integrate Active Directory Domain Services (AD DS) to transform the server into a domain controller.

- Launch **Server Manager** from the Start menu, navigating to **Manage** > **Add Roles and Features**.
- Proceed with the wizard, selecting **Active Directory Domain Services** for installation.
- Upon completion, specify your domain details and Directory Service Restore Mode (DSRM) password.
- Restart the server as prompted to finalize the role addition.

## Active Directory Setup

### Step 3: Configuring the Directory
With the server now a domain controller, it's time to configure Active Directory for your network's needs.

- Access **Active Directory Administrative Center** via the Start menu.
- For a new setup, choose **Create a new domain in a new forest** and input your desired forest name.
- Adjust the forest and domain functional levels as necessary.
- Confirm DNS settings and proceed with the domain controller options.
- Review and initiate the configuration, following the wizard's prompts.

## Administration and Management

### Step 4: Managing Network Resources
With Active Directory fully operational, the focus shifts to managing network users, groups, and resources.

#### User and Group Management
- Utilize the **Active Directory Users and Computers** console to add or modify user accounts and groups, adjusting permissions and security settings as needed.

#### Policy Administration
- Apply **Group Policy Management** for setting up policies that govern user and computer behaviors across the network.

#### Resource Sharing
- Leverage **Active Directory Users and Computers** to set up shared network resources, ensuring proper access control and resource allocation.

## Conclusion

By following these structured steps, Active Directory on Windows Server 2019 will be ready to serve your organization's needs, offering a robust framework for managing users, groups, and resources efficiently. Explore further to take full advantage of the comprehensive features available in Active Directory.

