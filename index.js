/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.log('Earthcomputer github bot loaded.');

  app.on('issue_comment.created', async context => {
    let command = context.payload.comment.body;
    if (command.startsWith("?")) {
      command = command.substring(1);
      const args = command.split(" ");
      if (args[0] === "template") {
        if (args.length < 2) return;
        if (args[1] === "64bitjava") {
          const issueComment = context.issue({ body: "This issue is commonly caused by not having 64-bit Java on your system. Please run `java -version` in `cmd` to check if you are using 32-bit. If you are, use [this link](https://javadl.oracle.com/webapps/download/AutoDL?BundleId=239858_230deb18db3e4014bb8e3e8324f81b43) to install 64-bit Java, then try running the Enchantment Cracker again." });
          return context.github.issues.createComment(issueComment);
        }
      }
    }
    return Promise.resolve();
  })
}
