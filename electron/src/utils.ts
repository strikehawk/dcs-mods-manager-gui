import { promisify } from "util";
import { exec } from 'child_process';

export async function hasAdminPrivileges(): Promise<boolean> {
  const platform = require("os").platform();
  let isAdmin = false;

  if (platform == "win32" || platform == "win64") {
      const promisifiedExec = promisify(exec);
      try {
          const { stdout, stderr } = await promisifiedExec("net session");
          if (!(stdout.indexOf("There are no entries in the list.") > -1) && !(stdout.indexOf("La liste est vide.") > -1)) {
              isAdmin = false;
          } else {
              isAdmin = true;
          }
      } catch (error) {
          isAdmin = false;
      }
  } else {
      // assume the user has no admin privileges, as this function only works for Windows
      console.warn("This function only works on Windows platform");
      isAdmin = false;
  }

  return isAdmin;
}
