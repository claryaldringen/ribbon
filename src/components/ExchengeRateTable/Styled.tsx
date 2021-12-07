import styled from 'styled-components'

export const Table = styled.table`
  border: solid 1px #7f7f7f;
  border-collapse: collapse;
  width: 100%;
`

export const Row = styled.tr`
  background: ${(props: { odd: number }) => (props.odd ? '#eeffee' : '#ddffdd')};
`
export const Cell = styled.td`
  padding: 4px;
`

export const RightCell = styled(Cell)`
  padding: 4px;
  text-align: right;
`
