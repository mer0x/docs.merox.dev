InfiniBand is a high-performance networking technology used primarily in data centers and high-performance computing (HPC) applications. It is utilized to interconnect servers, storage systems, and other devices within a distributed computing network, providing superior performance compared to other networking technologies like Ethernet or Fibre Channel. InfiniBand is known for its low latency, high bandwidth, and high scalability, making it ideal for applications requiring fast data transfers and consistent performance.

InfiniBand is particularly used in high-performance computing environments, such as supercomputing centers, but also in high-speed storage networks and virtualization applications. Additionally, InfiniBand supports RDMA (Remote Direct Memory Access), allowing direct data transfers between the memory of different systems without involving the CPU, significantly improving data throughput and reducing latency.


# Mellanox InfiniBand Cheatsheet

## 1. **Checking Status and Configuration of InfiniBand**

```bash
# Check InfiniBand device status
ibstat

# Get detailed InfiniBand device info
ibv_devinfo

# List all InfiniBand devices
ibdevices

# Check port status of InfiniBand devices
iblinkinfo

# Get InfiniBand address configuration (RDMA)
ibaddr

# Show detailed information about InfiniBand ports
ibportstate

# Show port statistics for InfiniBand
ibportinfo
```

## 2. **Configuring and Managing InfiniBand Devices**

```bash
# Configure InfiniBand device (e.g., network link)
ibdev2netdev

# Set an InfiniBand device to use a specific driver
ibdriver

# Update firmware for InfiniBand devices
mstflint -d <device> qflash <firmware_file.bin>

# List all available paths for InfiniBand devices
ibpathln

# Discover all InfiniBand connections between nodes
ibnetdiscover
```

## 3. **Performance Testing and Monitoring**

```bash
# Test InfiniBand performance between two devices (check latency and bandwidth)
ib_send_bw <device> <destination>

# Test RDMA performance on InfiniBand
ib_send_lat <device> <destination>

# Monitor InfiniBand traffic (e.g., bandwidth, latency, packets)
ibstat -i <device> -s

# Monitor InfiniBand errors
iberrdump
```

## 4. **Configuring and Securing RDMA**

```bash
# Check RDMA configuration on an InfiniBand device
rdma link

# Set an InfiniBand device for RDMA usage
rdma_resolve_route

# Test RDMA performance on InfiniBand
ib_send_lat -D <device> <destination>

# Check RDMA security and permissions
rdma_sec

# Configure RDMA encryption and authentication (for security)
rdma_auth
```

## 5. **Troubleshooting**

```bash
# Check InfiniBand configuration on multiple nodes
ibnetdiscover

# Diagnose InfiniBand errors and alerts
dmesg | grep ib

# InfiniBand logs
tail -f /var/log/ib_log

# Check port errors
ibportstate
```

## 6. **Configuring and Managing InfiniBand Subnets**

```bash
# Show detailed information about InfiniBand subnets
ibnetdiscover -v

# Set a subnet manager for InfiniBand
sm_profile

# Check active subnet manager on the InfiniBand network
ibstat -s
```

## 7. **Using Mellanox OFED (OpenFabrics Enterprise Distribution)**

```bash
# Check Mellanox OFED version
ofed_info

# Install Mellanox OFED on Linux
sudo yum install mlnx-ofed

# Run performance benchmark using Mellanox OFED
mlnx_bench
```

## 8. **Advanced Mellanox Administration Commands**

```bash
# Check status and details of Mellanox InfiniBand adapter
mst status

# Start or configure Mellanox driver for InfiniBand devices
mst start

# Configure a Mellanox device for RDMA
rdma_configure_device

# Install and configure Mellanox management software
mstflint -d <device> qflash <firmware_file.bin>
```

## 9. **Configuring QoS on InfiniBand**

```bash
# Set quality of service policy for InfiniBand
ib_qos_policy

# Configure flow priorities for InfiniBand
ib_flowcontrol

# Check QoS settings and flow priorities
ib_qos_show
```

---

This is a complete cheatsheet for managing and configuring Mellanox InfiniBand networks. It includes commands for checking status, performance testing, RDMA configuration, troubleshooting, and using Mellanox OFED. 

You can use these commands to familiarize yourself with InfiniBand network management and Mellanox devices.
