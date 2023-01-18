module.exports = {
  query: `
    meExtended: UsersPermissionsUser
`,
  mutation: `
    fbPixel(ip: String, userAgent: String, event: String, eventID: String): Boolean
`,
  resolver: {
    Query: {
      meExtended: {
        resolverOf: "plugins::users-permissions.user.me",
        resolver: "plugins::users-permissions.user.me",
      },
      user: true,
      users: true,
      usersConnection: false,
      role: false,
      roles: false,
      rolesConnection: false,
      importeditem: false,
      importeditems: false,
      importeditemsConnection: false,
      importconfig: false,
      importconfigs: false,
      importconfigsConnection: false,
    },
    Mutation: {
      fbPixel: {
        description: "Envía el pixel con los eventos",
        resolverOf: "plugins::users-permissions.user.me",
        resolver: async (obj, options, { context }) => {
          const { ip, userAgent, event, eventID } = options;
          const { email } = context.state.user;
          try {
            await strapi.config.functions.pixel.fbPixel(
              ip,
              userAgent,
              email,
              event,
              eventID
            );
            return true;
          } catch (error) {
            return false;
          }
        },
      },
      emailConfirmation: false,
      createRole: false,
      updateRole: false,
      deleteRole: false,
      createUser: false,
      deleteUser: false,
      updateImportconfig: false,
      deleteImportconfig: false,
      updateImporteditem: false,
      deleteImporteditem: false,
    },
  },
};
