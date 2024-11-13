
# Let's Cheat a Little Bit: cheat.sh / cht.sh

**cheat.sh** (accessible via **cht.sh**) is a service that provides quick command examples and solutions for various tools and programming languages, directly from the terminal.

## How to Use?

### Basic Command

To use **cheat.sh**, run the following command in your terminal:

```bash
curl cheat.sh/<command>
```

Example:

```bash
curl cheat.sh/git
```

This will return useful command examples for **Git**.

!!! tip "Tip"
    **cheat.sh** supports various programming languages, Linux commands, and other tools, all accessible with a simple **curl** command.

## Useful Examples

### 1. **Linux `ls` Command**

To get examples for the `ls` command:

```bash
curl cheat.sh/ls
```

!!! note "Note"
    **cheat.sh** can provide detailed information on options and usage examples for commands.

### 2. **Docker Commands**

To get examples for **Docker** commands:

```bash
curl cheat.sh/docker
```

!!! warning "Warning"
    Make sure **Docker** is installed on your system to test the examples locally.

## Example with Content Tabs: `kubectl`

We can use **cheat.sh** to get examples for **kubectl**, the Kubernetes command-line tool.

### 1. **Command and Output**

```bash
curl cheat.sh/kubectl
```

!!! info "Result"
    This will return useful examples of **kubectl** commands, such as how to list pods, get clusters, or interact with the Kubernetes API.

### 2. **Command and Output with Content Tabs**

<tabs>
<tab title="Command">

```bash
curl cheat.sh/kubectl get pods
```

</tab>
<tab title="Result">

```bash
NAME                       READY   STATUS    RESTARTS   AGE
nginx-5c5c67df9f-dxz5b      1/1     Running   0          5m
redis-7c9c98f6d9-vhns2      1/1     Running   0          5m
```

</tab>
</tabs>

## Advantages

- **Fast Access**: Quickly access commands without leaving your terminal.
- **Interactive**: Supports dynamic searching for commands, languages, and tools.
- **Multiple Solutions**: Provides various usage examples for each command or tool.

## Conclusion

**cheat.sh** is an essential tool for any programmer or system administrator. It offers fast and efficient solutions to common problems directly in the terminal, saving valuable time.

!!! tip "Extra Tip"
    You can save useful commands to a file for later use by redirecting the output:
    
    ```bash
    curl cheat.sh/git > git_cheats.txt
    ```

