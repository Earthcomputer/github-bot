/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.log('Earthcomputer github bot loaded.');

  app.on('issue_comment.created', async context => {
    let command = context.payload.comment.body;
    if (command.startsWith("?")) {
      const config = await context.config("earthbot.yml", {});
      command = command.substring(1);
      const args = command.split(" ");
      if (args[0] === "template" && config.templates) {
        if (args.length < 2) return;
        if (args[1] in config.templates) {
          const issueComment = context.issue({ body: config.templates[args[1]] });
          return context.github.issues.createComment(issueComment);
        }
      }
    }
    return Promise.resolve();
  })
}
