
namespace BlogDataLibrary.Database
{
    public interface ISqlDataAccess
    {
        List<T> LoadData<T, U>(string sqlstatement, U parameter, string connectionStringName, bool isStoredProcedure);
        void SaveData<T>(string sqlStatement, T parameters, string connectionSTringName, bool isStoredProcedure);
    }
}