const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec tabnews-db pg_isready --host localhost", handleReturn);

  function handleReturn(_, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      setTimeout(checkPostgres, 1000);
      return;
    }
    process.stdout.write("\n🟢 Postgres aceitou conexões\n");
  }
}

process.stdout.write("\n🔴 Aguardando Postgres aceitar conexões");
checkPostgres();
