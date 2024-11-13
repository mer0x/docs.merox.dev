
# Git Cheatsheet

## Basic Git Commands

```bash
# Check Git version
git --version

# Clone a repository
git clone repo_url

# Check the status of your working directory
git status

# Add all modified files to staging area
git add .

# Add a specific file to staging area
git add file_name

# Commit changes with a message
git commit -m "message"

# View commit history
git log

# View commit history in one line
git log --oneline

# Create a new branch
git branch branch_name

# Switch to a branch
git checkout branch_name

# Create and switch to a new branch
git checkout -b branch_name

# Commit changes to the current branch
git commit -am "message"

# Merge a branch into the current branch
git merge branch_name

# Push changes to the remote repository
git push origin branch_name

# Pull latest changes from remote
git pull

# Push a branch to remote repository
git push origin branch_name
```

## Collaboration in Git

```bash
# Add a remote repository
git remote add origin repo_url

# Check remote repositories
git remote -v

# Clone a repository
git clone repo_url

# View changes available on remote
git fetch

# Create a new tag
git tag v1.0.0

# View existing tags
git tag

# Push a tag to remote repository
git push origin v1.0.0
```

## Managing Merge Conflicts

```bash
# Check for merge conflicts
git diff

# After resolving conflicts, add the resolved files
git add conflicted_file

# Complete the merge after resolving conflicts
git commit
```