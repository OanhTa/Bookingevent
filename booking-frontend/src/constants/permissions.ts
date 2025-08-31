export const Permissions = {
  Identity: {
    Users: {
      Create: "Identity.Users.Create",
      Update: "Identity.Users.Update",
      Delete: "Identity.Users.Delete",
      Read: "Identity.Users.Read",
    },
    Roles: {
      Create: "Identity.Roles.Create",
      Update: "Identity.Roles.Update",
      Delete: "Identity.Roles.Delete",
      Read: "Identity.Roles.Read",
      Manage: "Identity.Roles.Manage",
    },
    Groups: {
      Create: "Identity.Groups.Create",
      Update: "Identity.Groups.Update",
      Delete: "Identity.Groups.Delete",
      Read: "Identity.Groups.Read",
    }
  },

  Categories: {
    Create: "Identity.Categories.Create",
    Update: "Identity.Categories.Update",
    Delete: "Identity.Categories.Delete",
    Read: "Identity.Categories.Read",
  },

  Events: {
    Create: "Identity.Events.Create",
    Update: "Identity.Events.Update",
    Delete: "Identity.Events.Delete",
    Read: "Identity.Events.Read",
    Publish: "Identity.Events.Publish",   
    Cancel: "Identity.Events.Cancel"     
  },

  Bookings: {
    Create: "Identity.Bookings.Create",   
    Update: "Identity.Bookings.Update",   
    Delete: "Identity.Bookings.Delete",   
    Read: "Identity.Bookings.Read",      
    Approve: "Identity.Bookings.Approve"  
  },

  AuditLogs: {
    Read: "Identity.AuditLogs.Read",
    Export: "Identity.AuditLogs.Export",
    Delete: "Identity.AuditLogs.Delete"
  }
} as const;
