'use client'

import Note from '../note'
import Table from '../table'
import React from 'react'
import { ChartPriceFormatter, DefaulTimeFormatter } from '../chart'
import { DataViewProps, DataViewState } from './index'
import { InnerScroll } from '../scroll'

const generateKey = (text: string) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export default class DataView extends React.Component<DataViewProps> {
  state: DataViewState = { data: [], fields: [], isEmpty: false }

  constructor(props: DataViewProps) {
    super(props)
  }

  componentDidMount(): void {
    this.generateData()
  }

  componentDidUpdate(prevProps: Readonly<DataViewProps>): void {
    if (Object.keys(prevProps.series) === Object.keys(this.props.series)) {
      this.generateData()
    }
  }

  private generateData() {
    this.setState({
      ...this.state,
      fields: {
        property: 'time',
        label: 'Date',
      },
    })

    const tempData: { [date: number]: any } = {}
    for (const key in this.props.series) {
      const slugKey = generateKey(key)
      const values = this.props.series[key]
      this.state.fields.push({ property: slugKey, label: key })
      values.data.forEach(df => {
        if (tempData[df.time] == undefined) {
          tempData[df.time] = {}
        }
        tempData[df.time][slugKey] = values.priceFormatter
          ? values.priceFormatter(df.value)
          : ChartPriceFormatter(df.value)
      })
    }

    const generatedData = Object.keys(tempData).map(key => {
      const values = tempData[key as unknown as number]
      values.time = this.props.timeFormatter
        ? this.props.timeFormatter(key)
        : DefaulTimeFormatter(key)
      return values
    })

    this.setState({
      ...this.state,
      data: generatedData.reverse(),
    })
  }

  componentWillUnmount(): void {}

  /* eslint-disable */
  // @ts-ignore
  render() {
    return (
      <>
        {this.state.data && this.state.data.length > 0 ? (
          // @ts-ignore
          <InnerScroll type="vertical" maxHeight="350px">
            {/* @ts-ignore */}
            <Table scale={0.75} data={this.state.data}>
              {this.state.fields.map((field, index) => {
                return (
                  <Table.Column key={index} prop={field.property} label={field.label} />
                )
              })}
            </Table>
          </InnerScroll>
        ) : (
          // @ts-ignore
          <Note>No datas found. </Note>
        )}
      </>
    )
  }
}
