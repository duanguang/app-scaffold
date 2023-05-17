export namespace MergeRequestModules {
  export interface List {
    _id: string;
    repository_name: string;
    target_repository_name: string;
    source_branch: string;
    target_branch: string;
    merge_title: string;
    merge_description: string;
    assign_members: string;
    reviewer_members: string;
    is_apply_deploy: boolean;
    gitlab_project_id: string;
    target_gitlab_project_id: string;
    assign_members_id: string;
    reviewer_members_id: string;
    reviewer_members_gitlab_id: string;
    assign_members_gitlab_id: string;
    repository_https: string;
    target_repository_https: string;
    project_id: string;
    target_project_id: string;
    gitlab_project_group: string;
    target_gitlab_project_group: string;
    creator_id: string;
    creator: string;
    merge_request_iid: number;
    merge_status: string;
    merge_status_desc: string;
    audit_status: string;
    create_time: number;
    update_time: number;
    __v: number;
  }
  export interface create_res_data {
    id: number;
    iid: number;
    project_id: number;
    title: string;
    description: string;
    state: string;
    created_at: string;
    updated_at: string;
    target_branch: string;
    source_branch: string;
    upvotes: number;
    downvotes: number;
    author: Author;
    assignee: Author;
    source_project_id: number;
    target_project_id: number;
    labels: string[];
    draft: boolean;
    work_in_progress: boolean;
    milestone: Milestone;
    merge_when_pipeline_succeeds: boolean;
    merge_status: string;
    merge_error?: any;
    sha: string;
    merge_commit_sha?: any;
    squash_commit_sha?: any;
    user_notes_count: number;
    discussion_locked?: any;
    should_remove_source_branch: boolean;
    force_remove_source_branch: boolean;
    allow_collaboration: boolean;
    allow_maintainer_to_push: boolean;
    web_url: string;
    references: References;
    time_stats: Timestats;
    squash: boolean;
    subscribed: boolean;
    changes_count: string;
    merged_by: Mergedby;
    merge_user: Mergedby;
    merged_at: string;
    closed_by?: any;
    closed_at?: any;
    latest_build_started_at: string;
    latest_build_finished_at: string;
    first_deployed_to_production_at?: any;
    pipeline: Pipeline;
    diff_refs: Diffrefs;
    diverged_commits_count: number;
    task_completion_status: Taskcompletionstatus;
  }
  /** 分支合并申请接口提交参数约束 */
  export interface create_body {
    repository_name: string;
    project_id: string;
    source_branch: string | string[];
    target_branch: string;
    merge_title: string;
    gitlab_project_group: string;
    target_gitlab_project_group: string;
    gitlab_project_id: string;
    target_project_id: string;
    repository_https: string;
    target_repository_https: string;
    merge_description: string;
    reviewer_members_id: string;
    reviewer_members: string;
    devops_assign_members: string,
    devops_assign_members_id: string,
    assign_members: string;
    assign_members_id: string;
  }
  export interface update_body {
    target_branch: string;
    merge_title: string;
    gitlab_project_id: string;
    merge_description: string;
    reviewer_members_id: string;
    reviewer_members: string;
    assign_members: string;
    assign_members_id: string;
    merge_request_iid: string;
    id: string;
    assign_members_gitlab_id: string;
    reviewer_members_gitlab_id: string;
  }
  export interface list_res {
    message: string;
    success: boolean;
    code: string;
    data: {
      list: List[];
      pageIndex: number;
      pageSize: number;
      total: number;
    };
  }
  /** 分支合并申请接口返回结果约束 */
  export interface create_res {
    message: string;
    success: boolean;
    code: string;
    data: create_res_data;
  }
  /** 分支合并申请接口返回结果约束 */
  export interface update_res {
    message: string;
    success: boolean;
    code: string;
    data: boolean;
  }
}




interface Taskcompletionstatus {
  count: number;
  completed_count: number;
}

interface Diffrefs {
  base_sha: string;
  head_sha: string;
  start_sha: string;
}

interface Pipeline {
  id: number;
  sha: string;
  ref: string;
  status: string;
  web_url: string;
}

interface Mergedby {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string;
  web_url: string;
}

interface Timestats {
  time_estimate: number;
  total_time_spent: number;
  human_time_estimate?: any;
  human_total_time_spent?: any;
}

interface References {
  short: string;
  relative: string;
  full: string;
}

interface Milestone {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
  due_date: string;
  start_date: string;
  web_url: string;
}

interface Author {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url?: any;
  web_url: string;
}