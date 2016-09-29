import * as SDK from '../../src/js/components/n-date'

let {React, ReactDOM, Model, Layout, NDate, NDateCalendar, $, Envs, moment} = SDK;


$(function() {
	let model = new Model({
		date: '2015'
	});
	model.addPostChangeListener('date', function(evt) {
		console.log({
			new: evt.new,
			old: evt.old
		});
	});
	let layout = new Layout('date', {
		comp: {
			placeholder: 'Input here'
		}
	});
	let layoutR = new Layout('date', {
		comp: {
			range: {
				max: moment('20161231'),
				min: moment('20160101')
			}
		}
	});
	let layoutRC = new Layout('date', {
		comp: {
			range: {
				min: moment('20101010')
			},
			dateEnabledChecker: function(date, type) {
				switch(type) {
					case this.YEAR:
						return date.year() != 2012;
					case this.MONTH:
						return date.year() != 2012 && date.month() != 9;
					case this.DAY:
						return date.year() != 2012 && date.month() != 9 && date.date() != 25;
				}
			}
		}
	});
	let layoutNC = new Layout('date', {
	});
	let layoutNC_YM = new Layout('date', {
		comp: {
			displayFormats: 'YYYYMM'
		}
	});
	let layoutNC_Y = new Layout('date', {
		comp: {
			displayFormats: 'YYYY'
		}
	});

	let panel = (<div className='n-top-container'>
		<div className='n-row n-in-form'>
			<div className='n-col-sm-6 n-col-md-3'>
				<NDate model={model} layout={layout} />
			</div>
			<div className='n-col-sm-6 n-col-md-3'>
				<NDateCalendar model={model} layout={layoutNC} />
			</div>
			<div className='n-col-sm-6 n-col-md-3'>
				<NDateCalendar model={model} layout={layoutNC_YM} />
			</div>
			<div className='n-col-sm-6 n-col-md-3'>
				<NDateCalendar model={model} layout={layoutNC_Y} />
			</div>
			<div className='n-col-sm-6 n-col-md-3'>
				<NDateCalendar model={model} layout={layoutR} />
			</div>
			<div className='n-col-sm-6 n-col-md-3'>
				<NDateCalendar model={model} layout={layoutRC} />
			</div>
		</div>
	</div>);
	ReactDOM.render(panel, document.getElementById('main'));
	window.model = model;
});
