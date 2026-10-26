# ART MEDITERRANI — mandatory review process

David requires a working website preview BEFORE a new pull request is opened.

1. Work on a feature branch. Never push website changes directly to main.
2. Push the branch to artmediterrani/artmediterrani.github.io. This repository is public; never add credentials or private files.
3. Publish its preview through the separate repository davidruizgarci/artmediterrani-preview-pr-2. Its Website review previews workflow checks source branches about every ten minutes (GitHub scheduling can be delayed). For immediate updates, dispatch .github/workflows/previews.yml on its default branch preview-pr-2.
4. Fetch https://davidruizgarci.github.io/artmediterrani-preview-pr-2/previews.json and find the exact source branch. Resolve its path against that base URL. Never guess or invent a preview URL.
5. Verify the deployed branch preview.json SHA equals the latest feature branch commit. Verify affected pages and local CSS/JS/images load over HTTP. Use browser QA when available and relevant. If verification fails, fix or report it; do not call a stale preview current.
6. Give David the verified clickable preview URL BEFORE creating a new PR. When opening the PR afterwards, include the same verified URL and reviewed commit in its description. Do not open a PR before handing over the preview.
7. For an existing PR, push corrections, refresh and verify its preview, then give David the current preview URL again.
8. David must review and approve the PR. Never merge, enable auto-merge, deploy production, change production Pages settings, or push to main without David's explicit authorization. Approval and merge are distinct actions.

The original preview site root is a frozen copy of the initial PR #2. Use /previews/ for current branch previews. See PREVIEW_PROCESS.md for operation and recovery.
