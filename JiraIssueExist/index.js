const axios = require('axios')

const main = async(inputs, auths, context) => {
  const key =  inputs.projectId
  const jql =  inputs.jql
  const maxResults =  inputs.maxResults
  // url to fetch data
  const url = `https://${inputs.sitename}.atlassian.net/rest/api/2/search`
  
  // query params passed to request
  const params = {
    jql : `project="${key}"`,
    maxResults
  }
  if(jql){
    params.jql = jql
  }

  // prepare the header
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auths.JIRA.ACCESS_TOKEN
  }
  
  // http get api call
  const response = await axios.get(url,{
    headers,
    params
  })
   
  // api response data
  //console.log(response.data)
  
  if(response.data && response.data && response.data.issues ){
    const issueObj = response.data.issues.find(issue=>issue.fields.summary == inputs.issueTitle)
    return !!issueObj
  }
  
  return false
}

module.exports.main = main