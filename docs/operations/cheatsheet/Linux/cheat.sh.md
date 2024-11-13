
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

## Example with Content Tabs: `kubectl`

We can use **cheat.sh** to get examples for **kubectl**, the Kubernetes command-line tool.

### 1. **Command and Output**

=== "Command"

            ```bash
            curl cheat.sh/kubectl
            ```

=== "Result"

            ```bash
            cheat:kubectl 
            # To display list of all available commands:
            kubectl -h
            
            # To display an explanation of a specific command:
            kubectl command_name -h
            
            # To display complete list of supported resources:
            kubectl api-resources
            
            # To display an explanation of a specific resource:
            kubectl explain resource_name
            
            # To display an explanation of a specific field of resource:
            kubectl explain resource_name.field_name
            
            # To display list of global command-line options:
            kubectl options
            
            # To set up `kubectl` autocomplete in bash (press Tab to use):
            source <(kubectl completion bash)
            
            # To display all resources in all namespaces:
            kubectl get all -A
            
            # To order events by `creationTimestamp`:
            kubectl get events --sort-by='.metadata.creationTimestamp'
            
            # To switch context of a specific cluster:
            kubectl config use-context CONTEXT_NAME [options]
            
            tldr:kubectl 
            # kubectl
            # Command-line interface for running commands against Kubernetes clusters.
            # Some subcommands such as `kubectl run` have their own usage documentation.
            # More information: <https://kubernetes.io/docs/reference/kubectl/>.
            
            # List information about a resource with more details:
            kubectl get pod|service|deployment|ingress|... -o wide
            
            # Update specified pod with the label 'unhealthy' and the value 'true':
            kubectl label pods name unhealthy=true
            
            # List all resources with different types:
            kubectl get all
            
            # Display resource (CPU/Memory/Storage) usage of nodes or pods:
            kubectl top pod|node
            
            # Print the address of the master and cluster services:
            kubectl cluster-info
            
            # Display an explanation of a specific field:
            kubectl explain pods.spec.containers
            
            # Print the logs for a container in a pod or specified resource:
            kubectl logs pod_name
            
            # Run command in an existing pod:
            kubectl exec pod_name -- ls /
            ```

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

