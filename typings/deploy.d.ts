export namespace RepoModules {
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
    project_name: string;
    project_description: string;
    repository_source: string;
    repository_https: string;
    repository_ssh: string;
    project_group: string;
    message_notify: string;
    message_channel: string;
    gitlab_project_id: string;
    creator_id: string;
    creator: string;
    create_time: number;
    update_time: number;
    __v: number;
  }
}
export namespace DeployModules{
  interface Root {
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
    project_id: string;
    release_title: string;
    release_content: string;
    source_branch: string;
    repository_https: string;
    developer_assign_members_id: string;
    developer_assign_members: string;
    devops_assign_members_id: string;
    devops_assign_members: string;
    gitlab_project_group: string;
    gitlab_project_id: string;
    creator_id: string;
    creator: string;
    deploy_status: string;
    developer_assign_status: string;
    devops_assign_status: string;
    merge_request_sha?: string;
    pipeline_id: string;
    jobs_id: string;
    deploy_module?: string;
    create_time: number;
    update_time: number;
    __v: number;
    developer_assign_date: number;
    deploy_date: number;
    devops_assign_date: number;
  }
}
