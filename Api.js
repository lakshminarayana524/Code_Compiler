require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const compiler = require("compilex");
const fs = require("fs");
const cors = require('cors')
const path = require("path");

const app = express();
// const cors = require("cors");
app.use(cors());
const options = { stats: true };
compiler.init(options);

app.use(bodyParser.json());
app.use("/codemirror-5.65.17", express.static("D:/compiler/codemirror-5.65.17"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("D:/compiler/index.html"));
});

app.post("/compile", (req, res) => {
    const { code, input, lang } = req.body;

    const handleResponse = (data) => {
        console.log(data);
        if (data.output) {
            res.send({ output: data.output.trim() });
        } else if (data.error) {
            res.send({ error: "Compilation error: " + data.error });
        } else {
            res.send({ error: "No output received." });
        }
    };

    try {
        if (lang === "Cpp") {
            const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            if (!input) {
                compiler.compileCPP(envData, code, handleResponse);
            } else {
                compiler.compileCPPWithInput(envData, code, input, handleResponse);
            }
        } else if (lang === "Java") {
            const envData = { OS: "windows" };
            if (!input) {
                compiler.compileJava(envData, code, handleResponse);
            } else {
                compiler.compileJavaWithInput(envData, code, input, handleResponse);
            }
        } else if (lang === "Python") {
            const envData = { OS: "windows" };
            if (!input) {
                compiler.compilePython(envData, code, handleResponse);
            } else {
                compiler.compilePythonWithInput(envData, code, input, handleResponse);
            }
        }

        // Delay before flushing files
        setTimeout(() => {
            // Attempt to delete and recreate the base temp directory
            manageTempDirectory('D:/compiler/temp', 3); // Retry up to 3 times
        }, 5000); // Increased delay

    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "Internal server error" });
    }
});

const manageTempDirectory = (dir, retries) => {
    fs.access(dir, fs.constants.F_OK, (err) => {
        if (err) {
            // Directory does not exist
            recreateBaseTempDirectory(dir, retries);
        } else {
            // Directory exists, delete it and recreate it
            deleteDirectory(dir, () => recreateBaseTempDirectory(dir, retries), retries);
        }
    });
};

const deleteDirectory = (dir, callback, retries) => {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            if (retries > 0) {
                console.log(`Retrying directory deletion (${retries} retries left)...`);
                setTimeout(() => deleteDirectory(dir, callback, retries - 1), 1000); // Retry after 1 second
            }
            return;
        }

        let remaining = files.length;
        if (remaining === 0) {
            fs.rmdir(dir, (err) => {
                if (err) {
                    console.error("Error deleting directory:", err);
                    if (retries > 0) {
                        console.log(`Retrying directory deletion (${retries} retries left)...`);
                        setTimeout(() => deleteDirectory(dir, callback, retries - 1), 1000); // Retry after 1 second
                    }
                    return;
                }

                console.log(`Deleted directory: ${dir}`);
                callback();
            });
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error("Error getting file stats:", err);
                    remaining--;
                    if (remaining === 0) {
                        deleteDirectory(dir, callback, retries);
                    }
                    return;
                }

                if (stats.isDirectory()) {
                    deleteDirectory(filePath, () => {
                        remaining--;
                        if (remaining === 0) {
                            deleteDirectory(dir, callback, retries);
                        }
                    }, retries);
                } else {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error("Error deleting file:", err);
                        } else {
                            console.log(`Deleted file: ${filePath}`);
                        }
                        remaining--;
                        if (remaining === 0) {
                            deleteDirectory(dir, callback, retries);
                        }
                    });
                }
            });
        });
    });
};

const recreateBaseTempDirectory = (dir, retries) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
            console.error("Error creating directory:", err);
            if (retries > 0) {
                console.log(`Retrying directory creation (${retries} retries left)...`);
                setTimeout(() => recreateBaseTempDirectory(dir, retries - 1), 1000); // Retry after 1 second
            }
        } else {
            console.log(`Recreated directory: ${dir}`);
        }
    });
};
port = process.env.port || 8000;
app.listen(port, () => {
    console.log("Server is running on http://localhost:8041");
});
