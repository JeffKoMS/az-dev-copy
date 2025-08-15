#!/usr/bin/env python3
"""Rewrite relative markdown link/image targets (./ or ../) to absolute raw GitHub URLs.
Usage: rewrite_links.py <file> <owner> <repo> <path_from_ref>
Where <path_from_ref> includes the branch/ref as its first segment (e.g. 'main/Instructions/Labs').
"""
import sys, re, posixpath

if len(sys.argv) != 5:
    print("Expected 4 args: file owner repo path_from_ref", file=sys.stderr)
    sys.exit(1)

path_file, owner, repo, file_dir_rel = sys.argv[1:5]
raw_prefix = f"https://raw.githubusercontent.com/{owner}/{repo}/"

try:
    with open(path_file, 'r', encoding='utf-8') as fh:
        text = fh.read()
except FileNotFoundError:
    sys.exit(0)

inline_pattern = re.compile(r'(!?\[[^\]]*\]\()(\.{1,2}/[^)\s]+)(\))')
ref_pattern = re.compile(r'^(\[[^\]]+\]:\s+)(\.{1,2}/\S+)$', re.MULTILINE)


def norm_join(base_dir: str, rel: str) -> str:
    candidate = posixpath.normpath(posixpath.join(base_dir, rel))
    if candidate.startswith('..'):
        return rel  # skip upward traversals
    return raw_prefix + candidate


def repl_inline(m):
    return f"{m.group(1)}{norm_join(file_dir_rel, m.group(2))}{m.group(3)}"


def repl_ref(m):
    return f"{m.group(1)}{norm_join(file_dir_rel, m.group(2))}"

text = inline_pattern.sub(repl_inline, text)
text = ref_pattern.sub(repl_ref, text)

with open(path_file, 'w', encoding='utf-8') as fh:
    fh.write(text)
