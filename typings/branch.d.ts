export namespace BranchApplyListModules {
  interface res_list {
    message: string;
    success: boolean;
    code: string;
    data: Data;
  }
  interface Data {
    pageIndex: number;
    pageSize: number;
    list: List[];
    total: number;
  }

  interface List {
    _id: string;
    repository_name: string;
    source_branch: string;
    branch_type: string;
    branch_name: string;
    branch_usage: string;
    assign_members: string;
    repository_https: string;
    assign_members_id: string;
    project_id: string;
    gitlab_project_group: string;
    gitlab_project_id: string;
    creator_id: string;
    creator: string;
    audit_status: string;
    create_time: number;
    update_time: number;
    __v: number;
  }
}

