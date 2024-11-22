const base_url = 'https://api.github.com';

    function httpGet(theUrl, return_headers) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        if (return_headers) {
            return xmlHttp
        }
        return xmlHttp.responseText;
    }

    function get_all_commits_count(owner, repo, sha) {
        let first_commit = get_first_commit(owner, repo);
        let compare_url = base_url + '/repos/' + owner + '/' + repo + '/compare/' + first_commit + '...' + sha;
        let commit_req = httpGet(compare_url);
        let commit_count = JSON.parse(commit_req)['total_commits'] + 1;
        console.log('Commit Count: ', commit_count);
        return commit_count
		paragraph.textContent = newText; 
		var contentJS = document.getElementById('contentInput').value;
		var contentNew = content.replace("info", contentJS);


    }
    
    function get_first_commit(owner, repo) {
        let url = base_url + '/repos/' + owner + '/' + repo + '/commits';
        let req = httpGet(url, true);
        let first_commit_hash = '';
        if (req.getResponseHeader('Link')) {
            let page_url = req.getResponseHeader('Link').split(',')[1].split(';')[0].split('<')[1].split('>')[0];
            let req_last_commit = httpGet(page_url);
            let first_commit = JSON.parse(req_last_commit);
            first_commit_hash = first_commit[first_commit.length - 1]['sha']
        } else {
            let first_commit = JSON.parse(req.responseText);
            first_commit_hash = first_commit[first_commit.length - 1]['sha'];
        }
        return first_commit_hash;
    }
	
    let owner = 'hackpurrin';
    let repo = 'jackpurrin.me';
    let sha = 'main';
    get_all_commits_count(owner, repo, sha);

	
	

