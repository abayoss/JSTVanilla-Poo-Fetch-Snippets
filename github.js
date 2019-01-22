class Github{
    constructor(){
        this.client_id = '7471451ed135c668e393';
        this.client_secret = 'd16786d22f83f448dc65b39f97766be3bd2532c7';
        this.repo_count = 5;
        this.repo_sort = 'created: asc'
    }
    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}
        ?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profilRepos = await fetch(`https://api.github.com/users/${user}
        /repos?per_page=${this.repo_count}&sort=${this.repo_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        
        const profile = await profileResponse.json();
        const repos = await profilRepos.json();

        return {
            profile,
            repos
        }
    }
}