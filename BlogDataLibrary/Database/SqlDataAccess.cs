using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace BlogDataLibrary.Database
{
    public class SqlDataAccess : ISqlDataAccess
    {
        private IConfiguration _config;

        public SqlDataAccess(IConfiguration config)
        {
            _config = config;
        }

        public List<T> LoadData<T, U>(string sqlstatement, U parameters, string connectionStringName, bool isStoredProcedure)
        {
            CommandType commandType = CommandType.Text;
            string connectionString = _config.GetConnectionString(connectionStringName);

            if (isStoredProcedure)
            {
                commandType = CommandType.StoredProcedure;
            }

            using (IDbConnection connection = new SqlConnection(connectionString))
            {
                List<T> rows = connection.Query<T>(sqlstatement, parameters, commandType: commandType).ToList();
                return rows;
            }
        }

        public void SaveData<T>(string sqlStatement, T parameters, string connectionSTringName, bool isStoredProcedure)
        {
            string connectionString = _config.GetConnectionString(connectionSTringName);
            CommandType commandType = CommandType.Text;

            if (isStoredProcedure)
            {
                commandType = CommandType.StoredProcedure;
            }

            using (IDbConnection connection = new SqlConnection(connectionString))
            {
                connection.Execute(sqlStatement, parameters, commandType: commandType);
            }
        }
    }
}
