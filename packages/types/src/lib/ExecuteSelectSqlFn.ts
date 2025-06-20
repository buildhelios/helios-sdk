/* <ALLOW_AUTO_DELETE DEPENDENCIES="ExecuteSelectSqlFn" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import type { SqlSelectRequest } from './SqlSelectRequest';

/**
 * Returns items selected by the raw
 * SQL query. The user executing the
 * sql only has access to a limited
 * set of SQL tables
 */
export interface invokeExecuteSelectSqlFnFunctionArgs
{
    input:SqlSelectRequest;
}
