import React from 'react';
import DataTable from 'material-table'
// import { Container } from './styles';

export default function DataTableComponent({ columns, data, loading }) {
  console.tron.log('columns', columns)
  console.tron.log('data', data)
  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={loading}
      title=""
      options={{
        emptyRowsWhenPaging: false,
        thirdSortClick: false,
      }}
      localization={{
        toolbar: {
          searchTooltip: 'Pesquisar',
          searchPlaceholder: 'Pesquisar',
        },
        body: {
          emptyDataSourceMessage: 'Sem dados',
        },
        pagination: {
          labelRowsSelect: 'Linhas',
          labelRowsPerPage: 'Linhas por paginas',
          labelDisplayedRows: '{from}-{to} de {count}',
          firstAriaLabel: 'Primeira pagina',
          firstTooltip: 'Primeira pagina',
          previousAriaLabel: 'Anterior',
          previousTooltip: 'Anterior',
          nextAriaLabel: 'Proxima',
          nextTooltip: 'Proxima',
          lastAriaLabel: 'Ultima pagina',
          lastTooltip: 'Ultima pagina',
        },
      }}
      style={{
        width: '80%',
        height: '50%',
        maxHeight: '50%'
      }}/>
  );
}
