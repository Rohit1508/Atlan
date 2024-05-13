# Sql query editor

## Short video to demonstrate the capability of this project
   - Atlan task demo- https://www.youtube.com/watch?v=-CzwljmbiIc
   - Hosted url - https://ai-sql-editor.netlify.app/


## Framework/plugins used
  - Reactjs 
  - Redux
  - Antd- (Ant design - for common components and icons)
  - react-simple-code-editor (for sql editor)

## Features added
- Tab based query (multiple tabs user can create which has its own state)
- Create query using Open AI
- Export the table data
- Save the queries for future reference
- Table schema search
- Can format the sql query on editor (Beautify)
- Paginated tabel data

## Page load time
  Used google lighthouse to measure the load time and to capture core web vital metrics
     
  ![Screenshot 2024-05-13 at 11 26 45 PM](https://github.com/Rohit1508/SQLEditor/assets/4987111/3f671f57-6fd8-4479-b77a-281fdcd3cf56)

## Optimisation done
- Dynamic fetching and store into the cache. The rows of a table are fetched only when the user requests it.
- Memoised the table component so that it won't re-render with same set of data (ex - while switching from one tab to another)
- Used React lazy to dynamically import the bundle when required (not fetching all of the codebase at the time of loading)
- Defined reusable components
