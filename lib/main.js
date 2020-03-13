var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
export var getBranchNameFromRef = function (ref) {
    return ref.replace(/^refs\/heads\//, '');
};
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var buildScript, bundlesizeGithubToken, githubPayload, commitSHA, branchName, repoOwner, repoName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    buildScript = core.getInput('build-script');
                    bundlesizeGithubToken = core.getInput('bundlewatch-github-token');
                    githubPayload = github.context.payload;
                    if (!githubPayload)
                        throw new Error('Failed when trying to get GitHub Payload');
                    commitSHA = githubPayload.pull_request ? githubPayload.pull_request.head.sha : githubPayload.after;
                    branchName = githubPayload.pull_request
                        ? githubPayload.pull_request.head.ref
                        : getBranchNameFromRef(githubPayload.ref);
                    repoOwner = githubPayload.repository ? githubPayload.repository.owner.login : '';
                    repoName = githubPayload.repository ? githubPayload.repository.name : '';
                    core.exportVariable('CI_REPO_OWNER', repoOwner);
                    core.exportVariable('CI_REPO_NAME', repoName);
                    core.exportVariable('CI_COMMIT_SHA', commitSHA);
                    core.exportVariable('CI_BRANCH', branchName);
                    core.exportVariable('BUNDLEWATCH_GITHUB_TOKEN', bundlesizeGithubToken);
                    if (!buildScript) return [3 /*break*/, 2];
                    console.log("Running build script: \"" + buildScript + "\"");
                    return [4 /*yield*/, exec.exec("" + buildScript, undefined)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    console.log("Running: bundlewatch");
                    return [4 /*yield*/, exec.exec("npx bundledash", undefined)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    core.setFailed(error_1.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
run();
export default run;
